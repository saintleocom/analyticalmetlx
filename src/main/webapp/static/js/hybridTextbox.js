var MeTLText = (function(){
  var textBoxCount = 0;
  var px = function(i){
    return ""+i+"px";
  };
  CKEDITOR.disableAutoInline = true;
  return {
    hideControls:function(){
      $("#topControl").hide();
      $("#bottomControl").hide();
      return true;
    },
    showControls:function(){
      $("#topControl").show();
      $("#bottomControl").show();
      return true;
    },
    append:function(x,y){
      var id = "txt_"+textBoxCount++;
      $('<textarea />',{
        id:id,
        name:id
      }).appendTo('#editables');

      var editor = CKEDITOR.inline(id, {
        startupFocus:true,
        extraPlugins: 'sharedspace,youtube',
        removePlugins: 'floatingspace,maximize,resize',
        sharedSpaces: {
          top: 'topControl',
          bottom: 'bottomControl'
        }
      });
      editor.on('instanceReady',function(){
        var container = editor.container.$;
        container.style.left = px(x);
        container.style.top = px(y);
      });
    }
  }
})();
