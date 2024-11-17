/*

Directory creation

Though the DELETE method in our file server is able to delete directories
(using rmdir), the server currently does not provide any way to create
a directory.
Add support for the MKCOL method (“make collection”), which should
create a directory by calling mkdir from the node:fs module. MKCOL is not
a widely used HTTP method, but it does exist for this same purpose
in the WebDAV standard, which specifies a set of conventions on top
of HTTP that make it suitable for creating documents.

*/

// This code won't work on its own, but is also included in the
// code/file_server.js file, which defines the whole system.

import { mkdir } from 'node:fs/promises';

methods.MKCOL = async function(request) {
  const path = urlPath(request.url);
  let stats;

  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await mkdir(path);
    return { status: 204 };
  }

  if (stats.isDirectory()) return { status: 204 };
  else return { status: 400, body: 'Not a directory' };
};
