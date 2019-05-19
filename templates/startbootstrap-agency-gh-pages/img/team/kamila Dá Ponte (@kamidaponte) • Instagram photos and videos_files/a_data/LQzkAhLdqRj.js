if (self.CavalryLogger) { CavalryLogger.start_js(["wPPD1"]); }

__d("PixelRatioConst",[],(function(a,b,c,d,e,f){e.exports={cookieName:"dpr"}}),null);
__d("CookieBannerComponent",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({BANNER:"banner",CLOSE_BUTTON:"close_button"})}),null);
__d("CookieConsentBlacklist",["CookieBannerComponent","Parent"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a={isBlacklisted:function(a){__p&&__p();a=a;if(!this.hasCookieBanner())return!0;var c=b("Parent").byAttribute(a,"data-cookiebanner");if(c){c=c.getAttribute("data-cookiebanner");switch(c){case b("CookieBannerComponent").CLOSE_BUTTON:return!1;case b("CookieBannerComponent").BANNER:return!0}}c=b("Parent").byAttribute(a,"data-nocookies");if(c)return!0;a.tagName.toLowerCase()!=="a"&&(a=b("Parent").byTag(a,"a"));if(a instanceof HTMLAnchorElement&&typeof a.href==="string"){c=a.href;for(var a=0;a<this.blacklistedHrefs.length;a++)if(c.indexOf(this.blacklistedHrefs[a])>-1)return!0}return!1},blacklistedHrefs:["/about/basics","/ads/settings","/help/111814505650678","/help/1561485474074139","/help/568137493302217","/help/769828729705201","/help/cookies","/policies/cookies","/policy/cookies","/privacy/explanation"],hasCookieBanner:function(){var a=document.querySelectorAll('[data-cookiebanner="'+b("CookieBannerComponent").BANNER+'"]');return a.length>0}};e.exports=a}),null);
__d("XConsentCookieController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/cookie/consent/",{})}),null);
__d("DeferredCookie",["Cookie","CookieConsentBlacklist","Env","SubscriptionList","XAsyncRequest","XConsentCookieController"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=new Map();a={shouldAddDefaultListener:!0,defaultHandler:null,autoFlushCookies:!1,sentConsentToServer:!1,callbacks:new(b("SubscriptionList"))(),addToQueue:function(a,c,d,e,f,h,i){if(this.autoFlushCookies){f?b("Cookie").setWithoutChecksIfFirstPartyContext(a,c,d,e,i):b("Cookie").setWithoutChecks(a,c,d,e,i);return}if(g.has(a))return;g.set(a,{name:a,value:c,nMilliSecs:d,path:e,firstPartyOnly:f,secure:i});h&&this.addDefaultInteractionListener()},flushAllCookiesWithoutRequestingConsentSeePrivacyXFNBeforeUsing:function(){delete b("Env").defer_cookies,g.forEach(function(a,c){a.firstPartyOnly?b("Cookie").setWithoutChecksIfFirstPartyContext(a.name,a.value,a.nMilliSecs,a.path,a.secure):b("Cookie").setWithoutChecks(a.name,a.value,a.nMilliSecs,a.path,a.secure)}),this.autoFlushCookies=!0,this.callbacks.fireCallbacks(),g=new Map(),this.removeDefaultInteractionListener()},flushAllCookies:function(){this.flushAllCookiesWithoutRequestingConsentSeePrivacyXFNBeforeUsing();if(!this.sentConsentToServer){this.sentConsentToServer=!0;var a=b("XConsentCookieController").getURIBuilder().getURI();new(b("XAsyncRequest"))(a).send()}},removeDefaultInteractionListener:function(){this.shouldAddDefaultListener=!1,this.defaultHandler&&(window.removeEventListener?window.removeEventListener("click",this.defaultHandler,!0):document.detachEvent&&document.detachEvent("onclick",this.defaultHandler),this.defaultHandler=null)},addDefaultInteractionListener:function(){this.shouldAddDefaultListener&&(this.shouldAddDefaultListener=!1,this.defaultHandler=this.baseInteractionHandler.bind(this),window.addEventListener?window.addEventListener("click",this.defaultHandler,!0):document.attachEvent&&document.attachEvent("onclick",this.defaultHandler))},registerCallbackOnCookieFlush:function(a){this.autoFlushCookies?a():this.callbacks.add(a)},baseInteractionHandler:function(a){var c=a.target;if(!(c instanceof HTMLElement))return;if(a instanceof MouseEvent&&!this.isValidClick(a))return;b("CookieConsentBlacklist").isBlacklisted(c)||this.flushAllCookies()},isValidClick:function(a){return a.which===void 0?!0:a.which==1},canEmbedThirdPartyPixel:function(){return b("Env").no_cookies===!0||b("Env").defer_cookies===!0?!1:this.autoFlushCookies||g.size===0}};e.exports=a}),null);
__d("XRefererFrameController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/common/referer_frame.php",{})}),null);
__d("isDevelopersURI",["isFacebookURI"],(function(a,b,c,d,e,f){"use strict";function a(a){return b("isFacebookURI")(a)&&a.getSubdomain()==="developers"}e.exports=a}),null);
__d("ControlledReferer",["Bootloader","DeferredCookie","URI","UserAgent","XRefererFrameController","isBonfireURI","isDevelopersURI","isMessengerDotComURI","isOculusDotComURI","isWorkplaceDotComURI","lowerFacebookDomain"],(function(a,b,c,d,e,f){__p&&__p();var g={useFacebookReferer:function(a,c,d){__p&&__p();if(!b("DeferredCookie").canEmbedThirdPartyPixel()){b("Bootloader").loadModules(["BanzaiODS"],function(a){a.bumpEntityKey("defer_cookies","block_controlled_referer_iframe")},"ControlledReferer");return}var e=!1;function f(){if(e)return;var b=a.contentWindow.location.pathname;if(b!=="/intern/common/referer_frame.php"&&b!=="/common/referer_frame.php")return;e=!0;a.contentWindow.document.body.style.margin=0;c()}var g;b("isMessengerDotComURI")(b("URI").getRequestURI())||b("isBonfireURI")(b("URI").getRequestURI())?g=b("XRefererFrameController").getURIBuilder().getURI().toString():b("isOculusDotComURI")(b("URI").getRequestURI())?g="/common/referer_frame.php":!b("lowerFacebookDomain").isValidDocumentDomain()?g="/intern/common/referer_frame.php":b("UserAgent").isBrowser("Opera")&&!b("isDevelopersURI")(b("URI").getRequestURI())?g=b("XRefererFrameController").getURIBuilder().getURI().toString():g=b("XRefererFrameController").getURIBuilder().getURI().qualify().setProtocol("https").setSubdomain("staticxx").toString();d==null&&b("isWorkplaceDotComURI")(b("URI").getRequestURI())&&(d="workplace");d&&(g+="?fb_source="+d);a.onload=f;a.src=g},useFacebookRefererHtml:function(a,b,c){g.useFacebookReferer(a,function(){a.contentWindow.document.body.innerHTML=b},c)}};e.exports=g}),null);
__d("TrackingPixel",["Arbiter","ControlledReferer","DeferredCookie","FBLogger"],(function(a,b,c,d,e,f){__p&&__p();var g={_iframe:void 0,loadWithNoReferrer:function(a){__p&&__p();if(!b("DeferredCookie").canEmbedThirdPartyPixel()){b("FBLogger")("tracking_pixel").mustfix("Attempting to load a TrackingPixel (%s) while cookies are deferred. This is not allowed because tracking pixels sometimes set cookies.",a);return}if(!g._iframe){var c=document.createElement("iframe");c.frameborder=0;c.width=c.height=1;c.style.position="absolute";c.style.top="-10px";b("ControlledReferer").useFacebookReferer(c,function(){b("Arbiter").inform("TrackingPixel/iframeIsLoaded",null,"persistent")},null);document.body.appendChild(c);g._iframe=c}b("Arbiter").subscribe("TrackingPixel/iframeIsLoaded",function(){var b=g._iframe.contentWindow;b=new b.Image();b.src=a})}};e.exports=g}),null);
__d("IntlControllerSpecialCharEncodings",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({NON_BREAKING_SPACE:"&nbsp;"})}),null);
__d("LocaleSwitchingReferrers",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CARRY_LOGOUT_LOGIN:"carry_logout_login",COMMUNITY_SITE_TRANSLATION_TOGGLE:"community_site_translation_toggle",FB4B_GLOBAL_SITES_DIALOG:"fb4b_global_sites_dialog",FB4B_GLOBAL_SITES_FOOTER:"fb4b_global_sites_footer",FB4C_GLOBAL_SITE_FOOTER:"fb4c_global_site_footer",IGB_GLOBAL_SITES_FOOTER:"igb_global_sites_footer",WORKPLACE_MARKETING_FOOTER:"workplace_marketing_footer",WORKPLACE_GALAHAD_CHANNEL:"workplace_galahad_channel",IG_HC_FOOTER:"ig_hc_footer",LOCALE_SWITCH_SCRIPT:"locale_switch_script",M_TOUCH_LOCALE_SELECTOR:"m_touch_locale_selector",M_BASIC_LOCALE_FOOTER:"m_basic_locale_footer",MEDIA_PORTAL_V3_DIALOG:"media_portal_v3_dialog",MOBILE_ACCOUNT_SETTINGS:"mobile_account_settings",MOBILE_CHROME_JP_FOOTER:"mobile_chrome_jp_footer",MOBILE_FB4B_GLOBAL_SITES_FOOTER:"mobile_fb4b_global_sites_footer",MOBILE_FB4B_GLOBAL_SITES_PAGE_VIEW:"mobile_fb4b_global_sites_page_view",MOBILE_HELP_CENTER_SEARCH:"mobile_help_center_search",MOBILE_LOCALE_CHANGED_NOTICE:"mobile_locale_changed_notice",MOBILE_LOCALE_LINKS:"mobile_locale_links",MOBILE_SUGGESTED_LOCALE_SELECTOR:"mobile_suggested_locale_selector",MOBILE_SWITCH_LANGUAGE_HEADER:"mobile_switch_language_header",SAFETY_CENTER_GLOBAL_SITES_FOOTER:"fbsc_global_sites_footer",SITEMAP:"sitemap",QP_PROMO:"qp_promo",RLX_QP_FORCE_SWITCH:"rlx_qp_force_switch",RLX_QP_PROMPT_SWITCH:"rlx_qp_prompt_switch",RLX_PROMPTED_SWITCH_FOLLOWUP_NOTICE:"rlx_prompted_switch_followup_notice",RLX_QP_MULTI_LANGUAGE:"rlx_qp_multi_language",WWW_ACCOUNT_SETTINGS:"www_account_settings",WWW_CARD_SELECTOR:"www_card_selector",WWW_CARD_SELECTOR_MORE:"www_card_selector_more",WWW_DEV_SITE:"www_dev_site",WWW_HELP_INLINE_SELECTOR:"www_help_inline_selector",WWW_I18N_NUB:"www_i18n_nub",WWW_LANGUAGE_PAGE:"www_language_page",WWW_LINK_DIALOG_SELECTOR:"www_link_dialog_selector",WWW_LIST_SELECTOR:"www_list_selector",WWW_LIST_SELECTOR_MORE:"www_list_selector_more",WWW_MANDATORY_LOCALE_SELECTION_POST:"www_mandatory_locale_selection_post",WWW_TRANS_APP_INCONSISTENT:"www_trans_app_inconsistent",FBCOLUMN_FOOTER:"fbcolumn_footer",WWW_LOGIN_BLUE_BAR:"www_login_blue_bar_nub",UNIT_TEST:"unit_test",ACCOUNT_CREATOR:"account_creator",AT_WORK_ACCOUNT:"at_work_account_creator",ADMIN_TOOL:"admin_tool",TRANSLATION_APP_UNINSTALL:"translation_app_uninstall",CHECKPOINT:"checkpoint",LEGACY_CONTROLLER:"legacy_controller",AYMT:"aymt",UNKNOWN:"unknown"})}),null);
__d("LoggedOutSwitchingLocaleTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:LoggedOutSwitchingLocaleLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:LoggedOutSwitchingLocaleLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:LoggedOutSwitchingLocaleLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setIndex=function(a){this.$1.index=a;return this};c.setNewLocale=function(a){this.$1.new_locale=a;return this};c.setOldLocale=function(a){this.$1.old_locale=a;return this};c.setReferrer=function(a){this.$1.referrer=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};return a}();c={index:!0,new_locale:!0,old_locale:!0,referrer:!0,time:!0,weight:!0};e.exports=a}),null);
__d("XIntlAccountSetLocaleAsyncController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/intl/ajax/save_locale/",{loc:{type:"String"},href:{type:"String"},index:{type:"Int"},ref:{type:"String"},ls_ref:{type:"Enum",defaultValue:"unknown",enumType:1},should_redirect:{type:"Bool",defaultValue:!0}})}),null);
__d("IntlUtils",["AsyncRequest","Cookie","IntlControllerSpecialCharEncodings","LocaleSwitchingReferrers","LoggedOutSwitchingLocaleTypedLogger","ReloadPage","XIntlAccountSetLocaleAsyncController","goURI"],(function(a,b,c,d,e,f){__p&&__p();a={setXmode:function(a){new(b("AsyncRequest"))().setURI("/ajax/intl/save_xmode.php").setData({xmode:a}).setHandler(function(){b("ReloadPage").now()}).send()},encodeSpecialCharsForXController:function(a){return a.replace(new RegExp("\xa0","g"),b("IntlControllerSpecialCharEncodings").NON_BREAKING_SPACE)},decodeSpecialCharsFromXController:function(a){return a.replace(new RegExp(b("IntlControllerSpecialCharEncodings").NON_BREAKING_SPACE,"g"),"\xa0")},setAmode:function(a){new(b("AsyncRequest"))().setURI("/ajax/intl/save_xmode.php").setData({amode:a,app:!1}).setHandler(function(){b("ReloadPage").now()}).send()},setRmode:function(a){new(b("AsyncRequest"))().setURI("/ajax/intl/save_xmode.php").setData({rmode:a}).setHandler(function(){b("ReloadPage").now()}).send()},setLocale:function(a,c,d,e){d||(d=a.options[a.selectedIndex].value);e=b("XIntlAccountSetLocaleAsyncController").getURIBuilder().getURI();new(b("AsyncRequest"))().setURI(e).setData({loc:d,ref:c,should_redirect:!1}).setHandler(function(a){b("ReloadPage").now()}).send()},appendCookieLocaleHistory:function(a){__p&&__p();var c="lh",d=b("Cookie").get(c),e=[],f=5;if(d!==null&&d!==void 0&&d!=""){e=d.split(",");e.push(a);for(var d=0;d<e.length-1;d++)e[d]==e[d+1]&&e.splice(d,1);e.length>=f&&e.slice(1,f)}else e.push(a);b("Cookie").set(c,e.toString())},setCookieLocale:function(a,c,d,e,f){e===void 0&&(e=b("LocaleSwitchingReferrers").OTHER),f===void 0&&(f=null),b("Cookie").setWithoutCheckingUserConsent_DANGEROUS("locale",a),this.appendCookieLocaleHistory(a),new(b("LoggedOutSwitchingLocaleTypedLogger"))().setNewLocale(a).setOldLocale(c).setIndex(f).setReferrer(e).log(),b("goURI")(d)}};e.exports=a}),null);
__d("legacy:intl-base",["IntlUtils"],(function(a,b,c,d,e,f){a.intl_set_xmode=b("IntlUtils").setXmode,a.intl_set_amode=b("IntlUtils").setAmode,a.intl_set_rmode=b("IntlUtils").setRmode,a.intl_set_locale=b("IntlUtils").setLocale}),3);
__d("PageHooks",["Arbiter","ErrorUtils","InitialJSLoader","PageEvents"],(function(a,b,c,d,e,f){__p&&__p();f={DOMREADY_HOOK:"domreadyhooks",ONLOAD_HOOK:"onloadhooks"};function g(){var c=a.CavalryLogger;!window.domready&&c&&c.getInstance().setTimeStamp("t_prehooks");j(k.DOMREADY_HOOK);!window.domready&&c&&c.getInstance().setTimeStamp("t_hooks");window.domready=!0;b("Arbiter").inform("uipage_onload",!0,"state")}function h(){j(k.ONLOAD_HOOK),window.loaded=!0}function i(a,c){return b("ErrorUtils").applyWithGuard(a,null,null,function(a){a.event_type=c,a.category="runhook"},"PageHooks:"+c)}function j(a){__p&&__p();var b=a=="onbeforeleavehooks"||a=="onbeforeunloadhooks";do{var c=window[a];if(!c)break;b||(window[a]=null);for(var d=0;d<c.length;d++){var e=i(c[d],a);if(b&&e)return e}}while(!b&&window[a])}function c(){window.domready||(window.domready=!0,j("onloadhooks")),window.loaded||(window.loaded=!0,j("onafterloadhooks"))}function d(){b("Arbiter").registerCallback(g,[b("PageEvents").BIGPIPE_DOMREADY,b("InitialJSLoader").INITIAL_JS_READY]),b("Arbiter").registerCallback(h,[b("PageEvents").BIGPIPE_DOMREADY,b("PageEvents").BIGPIPE_ONLOAD,b("InitialJSLoader").INITIAL_JS_READY]),b("Arbiter").subscribe(b("PageEvents").NATIVE_ONBEFOREUNLOAD,function(a,b){b.warn=j("onbeforeleavehooks")||j("onbeforeunloadhooks"),b.warn||(window.domready=!1,window.loaded=!1)},"new"),b("Arbiter").subscribe(b("PageEvents").NATIVE_ONUNLOAD,function(a,b){j("onunloadhooks"),j("onafterunloadhooks")},"new")}var k=babelHelpers["extends"]({_domreadyHook:g,_onloadHook:h,runHook:i,runHooks:j,keepWindowSetAsLoaded:c},f);d();a.PageHooks=e.exports=k}),null);
__d("legacy:onload-action",["PageHooks"],(function(a,b,c,d,e,f){a._domreadyHook=b("PageHooks")._domreadyHook,a._onloadHook=b("PageHooks")._onloadHook,a.runHook=b("PageHooks").runHook,a.runHooks=b("PageHooks").runHooks,a.keep_window_set_as_loaded=b("PageHooks").keepWindowSetAsLoaded}),3);
__d("AsyncRequestPathTraversalTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:AsyncRequestPathTraversalLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:AsyncRequestPathTraversalLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:AsyncRequestPathTraversalLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setOffendingURI=function(a){this.$1.offending_uri=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};return a}();c={offending_uri:!0,time:!0,weight:!0};e.exports=a}),null);
__d("FBEngagementWhiteopsFraudSensorTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:FBEngagementWhiteopsFraudSensorLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:FBEngagementWhiteopsFraudSensorLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:FBEngagementWhiteopsFraudSensorLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setInstanceID=function(a){this.$1.instance_id=a;return this};c.setPageID=function(a){this.$1.page_id=a;return this};c.setPostID=function(a){this.$1.post_id=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setTqBotDetectionProductEnum=function(a){this.$1.tq_bot_detection_product_enum=a;return this};c.setVC=function(a){this.$1.vc=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};return a}();c={instance_id:!0,page_id:!0,post_id:!0,time:!0,tq_bot_detection_product_enum:!0,vc:!0,weight:!0};e.exports=a}),null);
__d("MessengerEnvironment",["CurrentEnvironment"],(function(a,b,c,d,e,f){"use strict";a=babelHelpers["extends"]({},b("CurrentEnvironment"),{messengerui:!1,setMessengerUI:function(a){this.messengerui=a}});e.exports=a}),null);
__d("isAdsExcelAddinURI",[],(function(a,b,c,d,e,f){var g=new RegExp("(^|\\.)fbaddins\\.com$","i"),h=["https"];function a(a){if(a.isEmpty()&&a.toString()!=="#")return!1;return!a.getDomain()&&!a.getProtocol()?!1:h.indexOf(a.getProtocol())!==-1&&g.test(a.getDomain())}e.exports=a}),null);
__d("isValidURI",[],(function(a,b,c,d,e,f){var g=new RegExp("((^|\\.)instagram\\.com$)|((^|\\.)wit\\.ai$)|((^|\\.)accountkit\\.com$)","i"),h=["https"];function a(a){if(a.isEmpty()&&a.toString()!=="#")return!1;return!a.getDomain()&&!a.getProtocol()?!1:h.includes(a.getProtocol())&&g.test(a.getDomain())}e.exports=a}),null);
__d("AsyncSignal",["Promise","ErrorUtils","QueryString","Run","TimeSlice","TrackingConfig","URI","ZeroRewrites","getAsyncParams","isAdsExcelAddinURI","isBonfireURI","isFacebookURI","isMessengerDotComURI","isValidURI","isWorkplaceDotComURI","memoize","promiseDone"],(function(a,b,c,d,e,f){__p&&__p();var g;function a(a,c){this.data=c||{},this.uri=a.toString(),b("TrackingConfig").domain&&this.uri.charAt(0)=="/"&&(this.uri=b("TrackingConfig").domain+this.uri)}a.prototype.setHandler=function(a){this.handler=a;return this};a.prototype.setTimeout=function(a){this.timeout=a;return this};a.prototype.send=function(){b("TimeSlice").guard(this._send.bind(this),"AsyncSignal send",{propagationType:b("TimeSlice").PropagationType.ORPHAN})()};a.prototype._send=function(){__p&&__p();var a=this.handler,c=this.data;c.asyncSignal=(Math.random()*1e4|0)+1;var d=b("ZeroRewrites").rewriteURI(new(b("URI"))(this.uri));d=b("isFacebookURI")(d)||b("isMessengerDotComURI")(d)||b("isBonfireURI")(d)||b("isAdsExcelAddinURI")(d)||b("isWorkplaceDotComURI")(d)||b("isValidURI")(d);if(d)Object.assign(c,b("getAsyncParams")("POST"));else throw new Error("'"+this.uri+"' is an external URL, you should not send async signals to offsite links.");var e=b("QueryString").appendToUrl(this.uri,c);g||(g=new(b("Promise"))(function(a){b("Run").onAfterLoad(a)}));d=g.then(function(){return new(b("Promise"))(function(a,b){var c=new Image();c.onload=a;c.onerror=c.onabort=b;c.src=e})});if(a){var f=!1,h=b("memoize")(function(){b("ErrorUtils").applyWithGuard(a,null,[f])});b("promiseDone")(d.then(function(){f=!0,h()},h));this.timeout&&setTimeout(h,this.timeout)}return this};e.exports=a}),null);
__d("ErrorDialog",["Dialog","emptyFunction"],(function(a,b,c,d,e,f){var g={showAsyncError:function(a){try{return g.show(a.getErrorSummary(),a.getErrorDescription())}catch(b){alert(a)}},show:function(a,c,d,e){return new(b("Dialog"))().setTitle(a).setBody(c).setButtons([b("Dialog").OK]).setStackable(!0).setModal(!0).setHandler(d||b("emptyFunction")).setButtonsMessage(e||"").show()}};e.exports=g}),null);
__d("PageTransitions",["requireCond","cr:917439"],(function(a,b,c,d,e,f){e.exports=b("cr:917439"),a.PageTransitions=b("cr:917439")}),null);
__d("WebPixelRatioDetector",["Cookie","DOMEventListener","PixelRatioConst","Run"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("PixelRatioConst").cookieName,h=!1,i=!1,j=!1;function k(){return window.devicePixelRatio||1}function l(){b("Cookie").set(g,String(k()))}function m(){b("Cookie").clear(g)}function n(){if(i)return;i=!0;j&&m();k()!==1?l():m()}a={startDetecting:function(a){a&&(j=!0);if(h)return;h=!0;"onpagehide"in window&&b("DOMEventListener").add(window,"pagehide",n);b("Run").onBeforeUnload(n,!1)}};e.exports=a}),null);
__d("UITinyViewportAction",["Arbiter","ArbiterMixin","BanzaiScuba","CSS","Event","getDocumentScrollElement","queryThenMutateDOM"],(function(a,b,c,d,e,f){__p&&__p();var g=document.documentElement,h,i,j,k,l=!1,m=!1,n=!1,o=!1,p={init:function(a){__p&&__p();a=b("queryThenMutateDOM").bind(null,function(){k=k||b("getDocumentScrollElement")(),i=g.clientWidth<k.scrollWidth-1,j=g.clientHeight<400,h=j||i},function(){(h!==l||i!==m||j!==n)&&(b("CSS").conditionClass(g,"tinyViewport",h),b("CSS").conditionClass(g,"tinyWidth",i),b("CSS").conditionClass(g,"tinyHeight",j),b("CSS").conditionClass(g,"canHaveFixedElements",!h),p.inform("change",h),b("Arbiter").inform("tinyViewport/change",{tiny:h,tinyWidth:i,tinyHeight:j},"state"),l=h,m=i,n=j);if(!o){var a=new(b("BanzaiScuba"))("www_tinyview_port",null,{addBrowserFields:!0});a.addInteger("clientWidth",g.clientWidth);a.addInteger("clientHeight",g.clientHeight);a.addNormal("view",h?"tiny":"normal");a.post();o=!0}},"TinyViewport");a();b("Arbiter").subscribe("quickling/response",a);b("Event").listen(window,"resize",a)},isTiny:function(){return h},isTinyWidth:function(){return i},isTinyHeight:function(){return j}};Object.assign(p,b("ArbiterMixin"));e.exports=p}),null);
__d("ContextualLayerUpdateOnScroll",["Event"],(function(a,b,c,d,e,f){__p&&__p();a=function(){"use strict";__p&&__p();function a(a){this._layer=a}var c=a.prototype;c.enable=function(){this._subscriptions=[this._layer.subscribe("show",this._attachScrollListener.bind(this)),this._layer.subscribe("hide",this._removeScrollListener.bind(this))]};c.disable=function(){while(this._subscriptions.length)this._subscriptions.pop().unsubscribe()};c._attachScrollListener=function(){if(this._listener)return;var a=this._layer.getContextScrollParent();this._listener=b("Event").listen(a,"scroll",this._layer.updatePosition.bind(this._layer))};c._removeScrollListener=function(){this._listener&&this._listener.remove(),this._listener=null};return a}();Object.assign(a.prototype,{_subscriptions:[]});e.exports=a}),null);
__d("FBSiteWhiteOps",["ControlledReferer","FBEngagementWhiteopsFraudSensorTypedLogger","Style","URI","UserAgent"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a={appendToWindow:function(a,c,d,e,f){__p&&__p();e===void 0&&(e=null);f===void 0&&(f=null);var g=window.document.body;try{var h="fbsbx-sig-iframe-detection";if(g.getElementsByClassName(h).length!==0)return;var i=window.document.createElement("iframe");b("Style").apply(i,{height:"1px",width:"1px",opacity:"0",position:"relative",zIndex:"-9999999"});i.id="fbsbx-sig-iframe-"+a;i.className=h;i.referrerPolicy="no-referrer";b("ControlledReferer").useFacebookReferer(i,function(){__p&&__p();i.sandbox="allow-scripts allow-same-origin";var g="https://s.update.fbsbx.com/2/843748/utils.html?ti="+a+"&di=facebook.com&bt="+c+"&dt=8437481520966594402012";d&&(g+="&sn="+d);e!=null&&e!==""&&(g+="&c1="+e);f!=null&&f!==""&&(g+="&c3="+f);g=new(b("URI"))(g);var h=i.contentWindow.document,j="fbsbx-sig-iframe-form-"+a,k=g.toString();g=g.getQueryData();if(b("UserAgent").isBrowser("IE")||b("UserAgent").isBrowser("Edge")||b("UserAgent").isBrowser("IE Mobile")){var l="";for(var m in g)Object.prototype.hasOwnProperty.call(g,m)&&(l+="<input "+('name="'+m+'" ')+'type="hidden" autocomplete="off" '+('value="'+g[m]+'" />'));h.body.innerHTML='<form method="GET" id='+j+">"+l+"</form>";l=h.getElementById(j);l.action=k}else{h.body.innerHTML='<form method="GET" id='+j+"></form>";l=h.getElementById(j);l.action=k;for(var n in g)if(Object.prototype.hasOwnProperty.call(g,n)){k=h.createElement("input");k.name=n;k.value=g[n];k.autocomplete="off";k.type="hidden";l.appendChild(k)}}h.body.innerHTML+='<iframe height="100%" width="100%" onload=\'document.getElementById("'+j+"\").submit()'/>;"});g.appendChild(i)}catch(a){}},log:function(a,c,d){new(b("FBEngagementWhiteopsFraudSensorTypedLogger"))().setInstanceID(a).setTqBotDetectionProductEnum(c).log()}};e.exports=a}),null);
__d("PagesEventObserver",["Banzai"],(function(a,b,c,d,e,f){var g="pages_client_logging",h={VITAL_WAIT:b("Banzai").VITAL_WAIT,logData_DEPRECATED:function(a,c){c={delay:c||b("Banzai").VITAL_WAIT};b("Banzai").post(g,a,c)},notify:function(a,c,d,e,f){d=babelHelpers["extends"]({},d,{event_name:a,page_id:c,dedupe:e!==!1});a={delay:f||b("Banzai").VITAL_WAIT};b("Banzai").post(g,d,a)},registerLogOnClick:function(a,b,c){c===void 0&&(c=null),a.addEventListener("click",function(){c&&h.notify(c,b,null,null,null)})}};e.exports=h}),null);
__d("VisualCompletionGating",["requireCond","cr:729414"],(function(a,b,c,d,e,f){"use strict";e.exports=b("cr:729414")}),null);
__d("RecaptchaV2Constants",["keyMirror"],(function(a,b,c,d,e,f){"use strict";a=b("keyMirror")({RESIZE_IFRAME:null,CAPTCHA_SOLVED:null,GET_ORIGIN:null});e.exports={RecaptchaV2IFrameMessageTypes:a}}),null);
__d("Log",[],(function(a,b,c,d,e,f){"use strict";__p&&__p();a={DEBUG:3,INFO:2,WARNING:1,ERROR:0};b=function(a,b,c){for(var d=arguments.length,e=new Array(d>3?d-3:0),f=3;f<d;f++)e[f-3]=arguments[f];var h=0,i=c.replace(/%s/g,function(){return String(e[h++])}),j=window.console;j&&g.level>=b&&j[a in j?a:"log"](i)};var g={level:-1,Level:a,debug:b.bind(null,"debug",a.DEBUG),info:b.bind(null,"info",a.INFO),warn:b.bind(null,"warn",a.WARNING),error:b.bind(null,"error",a.ERROR),log:b};e.exports=g}),null);
__d("fbjs/lib/ExecutionEnvironment",["ExecutionEnvironment"],(function(a,b,c,d,e,f){"use strict";e.exports=b("ExecutionEnvironment")}),null);
__d("PerfXSharedFields",[],(function(a,b,c,d,e,f){var g={addCommonValues:function(a){navigator&&navigator.hardwareConcurrency!==void 0&&(a.num_cores=navigator.hardwareConcurrency);navigator&&navigator.deviceMemory&&(a.ram_gb=navigator.deviceMemory);navigator&&navigator.connection&&(typeof navigator.connection.downlink==="number"&&(a.downlink_megabits=navigator.connection.downlink),typeof navigator.connection.effectiveType==="string"&&(a.effective_connection_type=navigator.connection.effectiveType),typeof navigator.connection.rtt==="number"&&(a.rtt_ms=navigator.connection.rtt));return a},getCommonData:function(){var a={};g.addCommonValues(a);return a}};e.exports=g}),null);
__d("QuicklingRefreshOverheadUtil",["QuicklingConfig","WebStorage","performanceAbsoluteNow"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=null,h=1e4;a={onQuicklingStart:function(){g=b("performanceAbsoluteNow")()},onQuicklingVersionMatch:function(){g=null},onQuicklingRefreshStart:function(){if(!b("QuicklingConfig").logRefreshOverhead||g===null)return;var a=b("WebStorage").getSessionStorage();if(!a)return;a.setItem("quickling_refresh_overhead",(b("performanceAbsoluteNow")()-g).toString());a.setItem("quickling_refresh_start",Date.now().toString())},getOverhead:function(a){__p&&__p();if(!b("QuicklingConfig").logRefreshOverhead)return null;var c=b("WebStorage").getSessionStorageForRead();if(!c)return null;var d=c.getItem("quickling_refresh_start");if(d==null)return null;if(a-parseInt(d,10)>h)return null;a=c.getItem("quickling_refresh_overhead");return a!=null?parseFloat(a):null}};e.exports=a}),null);
__d("ClientServiceWorkerMessage",[],(function(a,b,c,d,e,f){__p&&__p();a=function(){"use strict";__p&&__p();function a(a,b,c){this.$1=a,this.$2=b,this.$3=c}var b=a.prototype;b.sendViaController=function(){if(!navigator.serviceWorker||!navigator.serviceWorker.controller)return;var a=new self.MessageChannel();this.$3&&(a.port1.onmessage=this.$3);navigator.serviceWorker.controller.postMessage({command:this.$1,data:this.$2},[a.port2])};return a}();e.exports=a}),null);
__d("filterNulls",[],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a){__p&&__p();var b=[];for(var a=a,c=Array.isArray(a),d=0,a=c?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var e;if(c){if(d>=a.length)break;e=a[d++]}else{d=a.next();if(d.done)break;e=d.value}e=e;e!=null&&b.push(e)}return b}e.exports=a}),null);
__d("md5",["str2rstr"],(function(a,b,c,d,e,f){__p&&__p();function g(a,b){__p&&__p();var c=a[0],d=a[1],e=a[2],f=a[3];c=i(c,d,e,f,b[0],7,-680876936);f=i(f,c,d,e,b[1],12,-389564586);e=i(e,f,c,d,b[2],17,606105819);d=i(d,e,f,c,b[3],22,-1044525330);c=i(c,d,e,f,b[4],7,-176418897);f=i(f,c,d,e,b[5],12,1200080426);e=i(e,f,c,d,b[6],17,-1473231341);d=i(d,e,f,c,b[7],22,-45705983);c=i(c,d,e,f,b[8],7,1770035416);f=i(f,c,d,e,b[9],12,-1958414417);e=i(e,f,c,d,b[10],17,-42063);d=i(d,e,f,c,b[11],22,-1990404162);c=i(c,d,e,f,b[12],7,1804603682);f=i(f,c,d,e,b[13],12,-40341101);e=i(e,f,c,d,b[14],17,-1502002290);d=i(d,e,f,c,b[15],22,1236535329);c=j(c,d,e,f,b[1],5,-165796510);f=j(f,c,d,e,b[6],9,-1069501632);e=j(e,f,c,d,b[11],14,643717713);d=j(d,e,f,c,b[0],20,-373897302);c=j(c,d,e,f,b[5],5,-701558691);f=j(f,c,d,e,b[10],9,38016083);e=j(e,f,c,d,b[15],14,-660478335);d=j(d,e,f,c,b[4],20,-405537848);c=j(c,d,e,f,b[9],5,568446438);f=j(f,c,d,e,b[14],9,-1019803690);e=j(e,f,c,d,b[3],14,-187363961);d=j(d,e,f,c,b[8],20,1163531501);c=j(c,d,e,f,b[13],5,-1444681467);f=j(f,c,d,e,b[2],9,-51403784);e=j(e,f,c,d,b[7],14,1735328473);d=j(d,e,f,c,b[12],20,-1926607734);c=k(c,d,e,f,b[5],4,-378558);f=k(f,c,d,e,b[8],11,-2022574463);e=k(e,f,c,d,b[11],16,1839030562);d=k(d,e,f,c,b[14],23,-35309556);c=k(c,d,e,f,b[1],4,-1530992060);f=k(f,c,d,e,b[4],11,1272893353);e=k(e,f,c,d,b[7],16,-155497632);d=k(d,e,f,c,b[10],23,-1094730640);c=k(c,d,e,f,b[13],4,681279174);f=k(f,c,d,e,b[0],11,-358537222);e=k(e,f,c,d,b[3],16,-722521979);d=k(d,e,f,c,b[6],23,76029189);c=k(c,d,e,f,b[9],4,-640364487);f=k(f,c,d,e,b[12],11,-421815835);e=k(e,f,c,d,b[15],16,530742520);d=k(d,e,f,c,b[2],23,-995338651);c=l(c,d,e,f,b[0],6,-198630844);f=l(f,c,d,e,b[7],10,1126891415);e=l(e,f,c,d,b[14],15,-1416354905);d=l(d,e,f,c,b[5],21,-57434055);c=l(c,d,e,f,b[12],6,1700485571);f=l(f,c,d,e,b[3],10,-1894986606);e=l(e,f,c,d,b[10],15,-1051523);d=l(d,e,f,c,b[1],21,-2054922799);c=l(c,d,e,f,b[8],6,1873313359);f=l(f,c,d,e,b[15],10,-30611744);e=l(e,f,c,d,b[6],15,-1560198380);d=l(d,e,f,c,b[13],21,1309151649);c=l(c,d,e,f,b[4],6,-145523070);f=l(f,c,d,e,b[11],10,-1120210379);e=l(e,f,c,d,b[2],15,718787259);d=l(d,e,f,c,b[9],21,-343485551);a[0]=r(c,a[0]);a[1]=r(d,a[1]);a[2]=r(e,a[2]);a[3]=r(f,a[3])}function h(a,b,c,d,e,f){b=r(r(b,a),r(d,f));return r(b<<e|b>>>32-e,c)}function i(a,b,c,d,e,f,g){return h(b&c|~b&d,a,b,e,f,g)}function j(a,b,c,d,e,f,g){return h(b&d|c&~d,a,b,e,f,g)}function k(a,b,c,d,e,f,g){return h(b^c^d,a,b,e,f,g)}function l(a,b,c,d,e,f,g){return h(c^(b|~d),a,b,e,f,g)}function m(a){__p&&__p();var b=a.length,c=[1732584193,-271733879,-1732584194,271733878],d;for(d=64;d<=a.length;d+=64)g(c,n(a.substring(d-64,d)));a=a.substring(d-64);var e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(d=0;d<a.length;d++)e[d>>2]|=a.charCodeAt(d)<<((d&3)<<3);e[d>>2]|=128<<((d&3)<<3);if(d>55){g(c,e);for(d=0;d<16;d++)e[d]=0}e[14]=b*8;g(c,e);return c}function n(a){var b=[],c=0;while(c<64)b[c>>2]=a.charCodeAt(c++)|a.charCodeAt(c++)<<8|a.charCodeAt(c++)<<16|a.charCodeAt(c++)<<24;return b}var o="0123456789abcdef".split("");function p(a){var b="",c=0;for(;c<4;c++)b+=o[a>>(c<<3)+4&15]+o[a>>(c<<3)&15];return b}function q(a){var b=[];for(var c=0;c<a.length;c++)b[c]=p(a[c]);return b.join("")}var r=function(a,b){return a+b&4294967295};function a(a){if(a==null)return null;for(var c=0;c<a.length;c++)if(a[c]>"\x7f"){a=b("str2rstr")(a);break}a=String(a);return q(m(a))}a("hello")!="5d41402abc4b2a76b9719d911017c592"&&(r=function(a,b){var c=(a&65535)+(b&65535);a=(a>>16)+(b>>16)+(c>>16);return a<<16|c&65535});e.exports=a}),null);