chrome.tabs.getSelected(null, function(tab) {
	chrome.storage.sync.get('size', function (data){
		var size = 200;
		if(data.size){
			size = data.size;
		}
		if(/^http(s)?[:]\/\/*/i.test(tab.url)){	
			$('#qr_code').empty().qrcode({width: size,height: size,text: tab.url});
			$('#url').width(size).text(tab.url);
			$('#not_available').hide();
			$('#qr_code canvas').click(function (){
				chrome.tabs.create({
					url: qrBase64(tab.url, {width: size,height: size})
				});
			});
			if(typeof(_gaq) != 'undefined'){
				_gaq.push(['_trackEvent', 'Top', tab.url]);
			}
		}else{
			$('#qr_code').hide();
			$('#url').hide();
			$('#not_available').show();
		}
	});
});