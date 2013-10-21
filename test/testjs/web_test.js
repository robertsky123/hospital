module('Module Upload');  
test( "hello test", function() {
var abc=new Gruntdemo.Module(5);
ok( abc.x == "5", "Passed!" );
equal( 1, 1, 'sucess');
deepEqual( [1], [1], 'sucess'); 
}); 


//https://github.com/appendto/jquery-mockjax/
var mockjaxDefaults = $.extend({}, $.mockjaxSettings);

function noErrorCallbackExpected(jqXHR, textStatus, errorThrown) {
    deepEqual( jqXHR.responseText, 'A text response from the server',"erro");
}

// Speed up our tests
$.mockjaxSettings.responseTime = 0;  

asyncTest('数据请求',4,function() {
   /*  $.mockjax({
        url: '/proxy',
         status: 200,
		responseTime:100,
		responseText: 'A text response from the server'
    }); */
	 $.mockjax({
        url: '/proxy',
        proxy: 'testjs/oembed.json'
    });
    $.ajax({
        url: '/proxy',
        dataType: 'json',
        success: function(json) {
			 ok(json, "AJAX call got a result");
			 ok(json.url, "URL exists in response");
			 equal(json.url, "http://distilleryimage5.s3.amazonaws.com/9436051c85b011e18cf91231380fd29b_7.jpg", "URL returned is correct");
			 equal(json.title, "Drainpipe", "The title returned is correct");
        },
        error: function(jqXHR, textStatus, errorThrown){noErrorCallbackExpected(jqXHR, textStatus, errorThrown);},
        complete: function() {
       
        }
    });
	setTimeout(function() {
		start();
	}, 200);
    $.mockjaxClear();
});
 

