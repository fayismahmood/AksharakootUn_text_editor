///Arrays
var fonts="AnjaliOldLipi,Chilanka,Dyuthi-Regular,Gayathri-Bold,Karumbi-Regular,Keraleeyam-Regular,Lohit-Malayalam,Manjari-Bold,Manjari-Regular,Meera-Regular,Rachana-Bold,Rachana-Regular,RaghuMalayalamSans-Regular,Samyak-Malayalam,Suruma,Uroob-Regular,NotoSansMalayalam-Bold,NotoSansMalayalam-Regular,NotoSerifMalayalam-Bold,NotoSerifMalayalam-Regular";






$(document).ready(f=>{
	
    $(".adder>button").click(function(){
    	var item=$(this).attr("data");
    	var inner=$(this).attr("inner");
    	var tag=$(this).attr("tag");

    	if(tag=="op"){

    		$(".focus").append('<'+item+' contenteditable="true">'+inner+'</'+item+'>')
    	}else{
			if(item=="img"){
				$(".focus").append('<'+item+' src="dfadsfdsasdf" />')
			}
    		
		}
		
        
    })


	$(document).on("click","#conte *",function(e){
		e.stopPropagation();
		$("#conte *").removeClass("focus")
		$(this).addClass("focus")

		var th=$(this);

        var texdata=["height","width","font-family","font-size","padding","margin","line-height","font-weight","border-radius","src"]
		texdata.forEach(e=>{
			$("[data="+e+"]").val(th.css(e))
		})

		var texAttrdata=["src"]
		texdata.forEach(e=>{
			$("[Attrdata="+e+"]").val(th.attr(e))
		})

		var coldata=["color","background-color"]
		coldata.forEach(e=>{
			var HexCol=RGBToHex(th.css(e));
			$("[data="+e+"]").css("background-color",HexCol)	
		})

		var coldata=["text-align","float"]
		coldata.forEach(e=>{
			th.css(e);
			$("[datatype="+e+"]").removeClass("ed")
			$("[data="+th.css(e)+"]").addClass("ed")	
		})
	})


	$("[mod=attr]").change(function(){
		var val=$(this).val();
		var item=$(this).attr("Attrdata");
		$(".focus").attr(item,val)
	})

	$("[mod=txtcm]").find("*").change(function(){
		var val="";
		var item=$(this).attr("Cdata");
		var vald=$(this).parent().find("*");
		vald.each(function(e,u){
			val=val+' '+$(u).val()
		})
		$(".focus").css(item,val)

	})

	$("[mod=txt]").keyup(function(){
		var val=$(this).val();
		var item=$(this).attr("data");
		$(".focus").css(item,val)
	})

	$("[mod=tgB]").click(function(){
		var datatype=$(this).attr("datatype");
		var data=$(this).attr("data");
		$(".ed").removeClass("ed")
		$(this).addClass("ed");
		$(".focus").css(datatype,data)
	})


    $("[mod=sel]").click(function(){
		var val=$(this).val();
		var sel_data=$(this).attr("sel-data");

		var Arr=eval(sel_data).split(",");
		var slWidth=$(this).css("width");
		$(this).after('<div style="width:calc('+slWidth+' +17px);"  class="slb"></div>')
		
		Arr.forEach(e=>{
			$(".slb").append('<div style="width:'+slWidth+';" class="opt"><span>'+e+'</span></div>')
		})

		$(".opt").click(function(){
			var html=$(this).html();
			
		})
		
		var th=$(this)
		var item=$(this).attr("data");
		$(document).on("click",".opt",function(){
			var html=$(this).find("span").html();
			th.val(html)
			$(".focus").css(item,html)
			$(".slb").remove();
		})
		

		outerClick($(this))
		
	})

	$("[mod=col]").click(function(){
		var da=$(this).attr("data");
		var th=$(this)

	var picker = new CP(document.querySelector('[data='+da+']'));

	picker.on("change", function(color) {
		th.css("background-color",'#' + color)  
		$(".focus").css(da, '#' + color)
	});

	})
	
	
})


///RemoveDigWhenClickAtDoc////
function outerClick(select){
    $(document).on("click",(e)=>{
        var container = $(select).parent();
        
            if (!container.is(e.target) && container.has(e.target).length === 0) 
            {
               container.find(".slb").remove();
               
            }
        })

}







function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function conte(){
	var cont=$('#conte>div').html();
	cont=cont.replace(/contenteditable="true"/g,"");
	$(".code>textarea").text(cont)
}


function dia(cont){
	$("body").append('<div id="dia">'+cont+'<button style="float:right;" onclick="diaClose()"><i class="icofont-ui-close"></i></button></div>')
	$("body").css("overflow","hidden")

}
function diaClose(){
	$("#dia").remove();
	$("body").css("overflow","auto")
}