!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){function e(t){this.x=t.offset().left,this.y=t.offset().top,this.width=t.width(),this.height=t.height(),this.left=t.position().left,this.top=t.position().top}var o="mousedown",n="mousemove",i="mouseup";"ontouchend"in document&&(o="touchstart",n="touchmove",i="touchend"),t.CanvasCrop=function(a){var h,r,s=t.extend({},{limitOver:1,isMoveOver:!1},a),u=t(a.cropBox)||t(".cropBox"),f=0,d=1,c=1,g=new e(u),p=a.thumbBox?t(a.thumbBox):u.find(".thumbBox"),l=new e(p),v=a.imgSrc,m=new Image,w={},x={dx:l.x-g.x,dy:l.y-g.y},y={left:0,top:0},M=function(){if(!v)throw"image src is not defined";b(),m.src=v,u.off(".CropDown").on(o+".CropDown",I)},b=function(){m.onload=function(){h=document.createElement("canvas"),C(),getScale(),h.id="visbleCanvas",h.style.position="absolute",r=h.getContext("2d"),drawImage(),setPosition({x:(g.width-h.width)/2,y:(g.height-h.height)/2}),u.find("#visbleCanvas").remove(),u.prepend(h),m.onload=m.onerror=null},m.onerror=function(){alert("下载图片出错")}},C=function(){var t=m.width,e=m.height,o=t/e;o<1?1==s.limitOver?e=g.height:2==s.limitOver&&(t=l.width,e=t/o):1==s.limitOver?(t=g.width,e=t/o):2==s.limitOver&&(e=l.height),c=e/m.height},I=function(o){if(o.preventDefault(),!h)return!1;var a=new e(t(h)),r=P(o),s={x:r.pageX,y:r.pageY};this.onselectstart=function(){return!1},t(document).on(n+".CropMove",function(t){t.preventDefault();var e=P(t),o=e.pageX-s.x,n=e.pageY-s.y;imgDis={x:a.left+o,y:a.top+n},setPosition(imgDis)}),t(document).on(i+".CropLeave",function(e){e.preventDefault(),t(document).off(".CropMove").off(".CropLeave")})},P=function(t){return{pageX:hasTouch()?t.originalEvent.touches[0].pageX:t.pageX,pageY:hasTouch()?t.originalEvent.touches[0].pageY:t.pageY}};innerRotate=function(){var t=h.width,e=h.height,o=Math.PI*f/180,n=Math.round(1e3*Math.cos(o))/1e3,i=Math.round(1e3*Math.sin(o))/1e3;h.height=Math.abs(n*e)+Math.abs(i*t),h.width=Math.abs(n*t)+Math.abs(i*e),o<=Math.PI/2?r.translate(i*e,0):o<=Math.PI?r.translate(h.width,-n*e):o<=1.5*Math.PI?r.translate(-n*t,h.height):r.translate(0,-i*t),r.rotate(o)},hasTouch=function(){return"ontouchend"in document},getScale=function(){w.w=h.width=m.width*c*d,w.h=h.height=m.height*c*d},drawImage=function(){r.clearRect(0,0,h.width,h.height),r.drawImage(m,0,0,w.w,w.h)},getPosition=function(t,e){return{x:y.left+(t-h.width)/2,y:y.top+(e-h.height)/2}},setPosition=function(e){var o={left:l.x-g.x,top:l.y-g.y,right:l.x-g.x+l.width,bottom:l.y-g.y+l.height};s.isMoveOver&&(o.left-e.x<0?e.x=o.left:o.right>e.x+h.width&&(e.x=o.right-h.width),o.top-e.y<0?e.y=o.top:o.bottom>e.y+h.height&&(e.y=o.bottom-h.height)),t(h).css({left:e.x,top:e.y}),y={left:e.x,top:e.y},x={dx:e.x-o.left,dy:e.y-o.top}},canvasTransform=function(t){if(!h)return!1;var e=h.width,o=h.height;d="undefined"==typeof t.ratio?d:t.ratio,f="undefined"==typeof t.rot?f:t.rot,r.save(),getScale(),innerRotate(),drawImage(),r.restore();var n=getPosition(e,o);setPosition(n)};var D={rotate:function(t){canvasTransform({rot:t})},scale:function(t){canvasTransform({ratio:t})},getDataURL:function(t){var t=t||"png",e=l.width,o=l.height,n=document.createElement("canvas"),i=n.getContext("2d");return n.width=e,n.height=o,i.drawImage(h,x.dx,x.dy,h.width,h.height),n.toDataURL("image/"+t)}};return M(),D}});