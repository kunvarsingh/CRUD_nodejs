var fs=require('fs');
var filepath=__dirname+'/FileContainers';

function FileDelete()
{
	if (fs.existsSync(filepath)) {
		//var filename = __dirname+'/FileContainers/'+'a-Copy.txt';
		
			fs.readdir(filepath, (err, files) => {
			  	for(var i=0;i<=files.length;i++){
			    	console.log(__dirname+'/FileContainers/'+files[i]);
			    	var filename = __dirname+'/FileContainers/'+files[i];
			    	fs.unlink(filename,function(){
			    		console.log("File deleted");
			    	});
				}
			});
	}
	else{
		console.log("kunvar");
	}
}
FileDelete();