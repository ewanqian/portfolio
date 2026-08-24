gl.bindTexture(gl.TEXTURE_2D,tex);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,atlas);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
