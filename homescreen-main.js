var main=function(){
	/*Dicta tools button*/
	$('div#dicta-tools').click(function(){
		$('img#dicta-tools-button').toggleClass('active');
	});

	/*Upload/Delete File and save it (next 2 functions)*/
	$('div#upload').click(function(){
		if($('div.regular-file').size() >= 7){
			alert("You don't have more space for another file")
		}
		else{
			$('input#addfile-input').trigger('click');
		}
	});

	var files_name = [];
	var files_size = [];
	var all_size = 0;
	$('input#addfile-input').change(function(e){
		$value = $(this)[0].files[0].name;
		$('div#files').prepend('<div class="regular-file file"><p class="delete-file">x</p><img src="img/homescreen-logo.png" class="bgimg-file"/><div class="footer-file"><p class="name-file">' + $value + '</p></div></div>');
		files_name.push($value);
		files_size.push($(this)[0].files[0].size);
		all_size += $(this)[0].files[0].size;
		$('p.delete-file').click(function(){
			$(this).parent().remove();
		});
	});

	/*Start button*/
	$('button#start').click(function(){
		if ($('div.regular-file').size() < 2){
			alert ('You need minimum two files to start');
		}
		else{
			$.get('files-order.html', function(data){
				$('section#body').empty();
				$('section#body').append(data);
				var $summary_template = $('section#body').find('template#summary-template').html();
				var summary = {
					total_files: files_name.length,
					all_size: all_size,
					total_size: function(){
						if(this.all_size < 1000) return this.all_size + " Bytes";
						this.all_size = this.all_size/1000;
						if(this.all_size < 1000) return this.all_size + "KB";
						this.all_size = this.all_size/1000;
						if(this.all_size < 1000) return this.all_size + "MB";
						this.all_size = this.all_size/1000;
						return all_size + "GB";
					}
				};
				$('section#body').append(Mustache.render($summary_template, summary));
			});
		}
	});
}

$(document).ready(main);