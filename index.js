'use strict';
var gulp = require('gulp');
var fs = require("fs");
var tap = require('gulp-tap');
var path = require('path');

module.exports = function(options) {
	options.path = options.path || '.';
	
	function createJson(file){
		fs.readFile(file.path, "utf-8", function(err, _data) {
			var _start=false;
			var _end=false;
			var _strMultiline="";
			var _tempId="";
			var _globalTrad={};
			var mS;
			var mE;
			var m;
			_data.split("\n").forEach(function(line){
				if(((mS=/^msgid "(.*)"$/.exec(line))!=null) || ((mE=/^msgstr "(.*)"$/.exec(line))!=null)){
					if(mS!=null){
						_start=true;
						if(_end){
							_end=false;
							if(_tempId.trim()!="")
								_globalTrad[_tempId]=_strMultiline;
							_strMultiline="";
							_tempId="";
						}
						_strMultiline+=mS[1];
					}
					else if(mE!=null){
						_end=true;
						if(_start){
							_start=false;
							_tempId=_strMultiline;
							_strMultiline="";
						}
						_strMultiline+=mE[1];
					}
				}else{
					if(_start || _end)
						_strMultiline+= ( ( (/^#~ \"(.*)\"$/.exec(line)==null) && (/^#: \"(.*)\"$/.exec(line)==null) && ((m=/^\"(.*)\"$/.exec(line))!=null) ) ? m[1] : "" );
				}
			});
			if(_strMultiline!="" && _tempId!="")
				_globalTrad[_tempId]=_strMultiline;
	    	return fs.writeFileSync(file.path.replace(/.po$/, ".json"), JSON.stringify(_globalTrad));
	    });
	}

	return gulp.src(options.path+"/*.po")
		.pipe(tap(function(file, t) {
	        createJson(file);
	    }));
}
