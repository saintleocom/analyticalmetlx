var TokBox=function(){var c=!1,d=!1,p=!1,h={},k=void 0,v=void 0,l=void 0,u=void 0,w=!1,y=function(e){console.log("TokBox conv",e);e&&(w="permissions"in e&&e.permissions.studentsMayBroadcast,l&&(Conversations.shouldModifyConversation(e)?(l.show(),u.prop("checked",w).unbind("click").on("click",function(){var e=$(this).prop("checked");if("Conversations"in window){var c=Conversations.getCurrentConversation(),d=c.permissions;d.studentsMayBroadcast=e;changePermissionsOfConversation(c.jid.toString(),d)}})):
(u.unbind("click"),l.hide())));_.forEach(h,function(c){c.refreshVisualState()})};Progress.conversationDetailsReceived.TokBox=y;return{getSessions:function(){return h},initialize:function(){k=$("#videoConfSessionsContainer");l=k.find(".teacherControls").clone();u=l.find("#canBroadcast");v=k.find(".videoConfSessionContainer").clone();k.empty();k.append(l);y(Conversations.getCurrentConversation());p=!0},receiveTokBoxSession:function(e){if(p)if(k.css({display:"flex"}),0==OT.checkSystemRequirements())c||
(errorAlert("Video conferencing disabled","Video conferencing is disabled because your browser does not support it.  You could try recent versions of Chrome or Firefox."),c=!0);else if(d&&!(e.sessionId in h)){var m=v.clone();k.append(m);e=TokBoxSession(e,m);h[e.id]=e;e.refreshVisualState()}},getTokBoxEnabledState:function(){return d},setTokBoxEnabledState:function(c){d=c},removeSessions:function(c){_.forEach(h,function(d){_.some(c,function(c){return c==d.id})&&(d.shutdown(),delete h[d.id])})},canPublish:function(){return Conversations.shouldModifyConversation()||
w}}}(),TokBoxSession=function(c,d){var p=160,h=120,k=15,v=[320,640,1280],l=[240,480,720],u=[1,7,15,30],w=function(a){var b=_.reverse(_.filter(u,function(b){return b<=a}))[0];void 0==b&&(b=u[0]);return b},y=function(a){var b=_.reverse(_.filter(v,function(b){return b<=a}))[0];void 0==b&&(b=v[0]);return b},e=function(a){var b=_.reverse(_.filter(l,function(b){return b<=a}))[0];void 0==b&&(b=l[0]);return b},m=function(){return"isConnected"in f&&f.isConnected()},B={},q=d.find(".videoConfStartButton"),x=
d.find(".videoConfContainer"),z=d.find(".videoConfStartButtonContainer"),E=d.find(".videoSubscriptionsContainer"),F=d.find(".videoContainer").clone(),C=d.find(".broadcastContainer"),G=d.find(".broadcastLink");E.empty();C.empty();x.empty();var r={},n=void 0,g=function(){q.unbind("click");console.log("refreshing visual state:",TokBox.canPublish());m()&&TokBox.canPublish()?(x.show(),"capabilities"in f&&"publish"in f.capabilities&&1==f.capabilities.publish?(z.show(),q.show(),q.on("click",function(){m()&&
(void 0==n?D():A())})):(m()&&A(!0),z.hide(),q.hide(),x.hide())):(m()&&A(!0),z.hide(),q.hide(),x.hide());d.find(".subscribedStream").removeClass("subscribedStream");if(f.connection){var a=f.connection.data.match(/description=(.+)$/)[1],b=a;if(a==Conversations.getCurrentConversationJid())b="everyone";else{var c=_.flatMap(Conversations.getCurrentSlide().groupSets,function(b){return _.find(b.groups,function(b){return b.id==a})});c.length&&(b=sprintf("group %s",c[0].title))}z.find(".context").text(b)}void 0!=
n?q.addClass("publishedStream").find("div").text("Hide from"):q.removeClass("publishedStream").find("div").text("Stream to");_.forEach(r,function(a){"refreshVisual"in a&&a.refreshVisual()});DeviceConfiguration.applyFit()},D=function(){g();if(m()&&void 0==n){var a=sprintf("tokBoxVideoElemPublisher_%s",_.uniqueId()),b=$("<span />",{id:a,"class":"publisherVideoElem"});d.find(".viewscreen").append(b);sprintf("%sx%s",y(p),e(h));n=a=OT.initPublisher(a,{name:UserSettings.getUsername(),width:p,height:h,resolution:"320x240",
frameRate:w(k),insertMode:"append"},function(a){a&&console.log("tokbox error:",a)});a.element.style.width=p;a.element.style.height=h;f.publish(a);d.find(".videoConfStartButton").addClass("publishedStream")}g()},A=function(a){a||g();m()&&void 0!=n&&(d.find(".publisherVideoElem").remove(),f.unpublish(n),n=void 0,d.find(".videoConfStartButton").removeClass("publishedStream"));a||g()};Progress.afterWorkQueuePause.videoStreaming=function(){_.forEach(r,function(a){"subscriber"in a&&null!=a.subscriber&&
"restrictFramerate"in a.subscriber&&a.subscriber.restrictFramerate(!0)})};Progress.beforeWorkQueueResume.videoStreaming=function(){_.forEach(r,function(a){"subscriber"in a&&null!=a.subscriber&&"restrictFramerate"in a.subscriber&&a.subscriber.restrictFramerate(!1)})};Progress.conversationDetailsReceived.videoStreaming=function(a){console.log("videoStreaming conversationDetails",a);"jid"in a&&"Conversations"in window&&"permissions"in a&&"studentsMayBroadcast"in a.permissions&&g()};var f=OT.initSession(c.apiKey,
c.sessionId);f.on({streamDestroyed:function(a){a.stream.id in r&&(r[a.stream.id].elem.remove(),delete r[a.stream.id],g())},streamCreated:function(a){if("capabilities"in f&&"subscribe"in f.capabilities&&1==f.capabilities.subscribe){var b=a.stream,c=r[b.id];if(void 0==c){c={stream:b,subscribed:!1,refreshVisual:function(){}};r[b.id]=c;var d=sprintf("tokBoxVideoElemSubscriber_%s",_.uniqueId()),e=$(F.clone()),k=$("<span />",{id:d,"class":"subscriberVideoElem"});e.find(".publisherName").text(a.stream.name);
var m=e.find(".videoConfSubscribeButton"),l=function(){m.toggleClass("subscribedStream",c.subscribed)};l();var t=r[b.id],n=b.name,q=function(){t.subscribed=!0;B[n]=!0;var a=f.subscribe(t.stream,d,{insertMode:"append",width:p,height:h},function(a){a&&(e.remove(),console.log("error when subscribing to stream",a,t.stream.name,t.stream.id))});a.element.style.width=p;a.element.style.height=h;a.on("videoDimensionsChanged",function(b){a.element.style.width=b.newValue.width+"px";a.element.style.height=b.newValue.height+
"px"});t.subscriber=a;t.refreshVisual=l};e.find(".videoConfSubscribeButton").on("click",function(){t.subscribed?(t.subscribed=!1,f.unsubscribe(t.subscriber),delete B[n]):q();g()});k.prepend(e);x.append(k);c.videoSelectorId=d;c.elem=e;n in B&&q();g()}else c.stream=b}},sessionConnected:function(a){g()},sessionDisconnected:function(a){g()},sessionReconnected:function(a){g()},sessionReconnecting:function(a){g()}});f.connect(c.token,function(a){a&&console.log("error when connecting to tokBox",a,c);g()});
return{startPublish:D,receiveBroadcast:function(a){if(null!=a&&"broadcastUrls"in a&&"hls"in a.broadcastUrls){var b=G.clone();b.attr("href",a.broadcastUrls.hls);C.append(b)}else C.empty()},getIsConnected:m,id:f.id,getSession:function(){return f},refreshVisualState:g,shutdown:function(){f.disconnect();d.remove()},resizeVideo:function(a,b,c){void 0!=a&&(p=a);void 0!=b&&(h=b);void 0!=c&&(k=c);void 0!=n&&(A(),startPublisherFunc());_.forEach(r,function(a){"subscriber"in a&&null!=a.subscriber&&(a.subscriber.setPreferredResolution({width:p,
height:h}),"refreshVisual"in a&&a.refreshVisual())});g()}}};function receiveTokBoxSessionToken(c){"token"in c&&TokBox.receiveTokBoxSession(c)}function removeTokBoxSessions(c){TokBox.removeSessions(c)}function receiveTokBoxEnabled(c){console.log("TokBox enabled",c);TokBox.setTokBoxEnabledState(c)}function receiveTokBoxArchives(c){}function receiveTokBoxBroadcast(c){};
