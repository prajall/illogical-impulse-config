chrome.tabs.getSelected(null, function(tab) {
	chrome.storage.sync.get('size', function (data){
		var size = 200;
		if(data.size){
			size = data.size;
		}
		$('#size'+size).attr('checked', true);
	});
	$('#save_btn').click(function (){
		chrome.storage.sync.set({'size': $('input[name=size]:checked').val()}, function() {
		});
	});
	$('#generate_btn').click(function (){
		var size = $('div.size input[type=radio]:checked').val() || 200;
		if(!(/^\s*$/i.test($('#generate_input').val()))){	
			$('#qr_code').empty().append($('<img />').attr('src', qrBase64($('#generate_input').val(), {width: size,height: size})));
			$('#download_btn').show();
			if(typeof(_gaq) != 'undefined'){
				_gaq.push(['_trackEvent', 'Direct', $('#generate_input').val()]);
			}
		}else{
			$('#qr_code').empty().height(0);
			$('#download_btn').hide();
		}
	});
	$('#download_btn').click(function (){
		if($('#qr_code img').length > 0){
			chrome.tabs.create({
				url: $('#qr_code img').attr('src')
			});
		}
	});
});