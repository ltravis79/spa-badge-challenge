var miniQuery = (function() {
  var ready = function(callback){
    if (document.readyState == "complete"){
      callback();
    }
    else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }
  var SweetSelector = (function(){
    var queryId = function(iwantanid){
      return document.getElementById(iwantanid);
    }

    var queryClass = function(greedyClasses){
      return document.getElementsByClassName(greedyClasses)[0];
    }

    var queryTag = function(taggytags){
      return document.getElementsByTagName(taggytags)[0];
    }

    var select = function(selector){
      if (selector.substring(0,1) == '#'){
        return queryId(selector.substring(1));
      }
      else if (selector.substring(0,1) == '.'){
        return queryClass(selector.substring(1));
      }
      else
        return queryTag(selector);
    }
    return {
      select: select
    }
  }) ()

  var DOM = (function() {
    var html = function(selector) {
      return SweetSelector.select(selector).innerHTML;
    }

    var hide = function(selector) {
      SweetSelector.select(selector).style.display="none";
    }

    var show = function(selector) {
      SweetSelector.select(selector).style.display="";
    }

    var addClass = function(selector, newClass) {
      SweetSelector.select(selector).className +=" " + newClass;
    }

    var removeClass = function(selector, oldClass) {
      var item = SweetSelector.select(selector);
      item.className = item.className.replace(oldClass, '');
    }

    return {
      hide: hide,
      show: show,
      addClass: addClass,
      removeClass: removeClass,
      html: html
    }
  }) ()

  var EventDispatcher = (function() {
    var on = function(selector, eventname, functionname){
      // debugger
      SweetSelector.select(selector).addEventListener(eventname, functionname);
    }

    var trigger = function(selector, eventname){
      var event = new Event(eventname);
      SweetSelector.select(selector).dispatchEvent(event);
    }

    return {
      on: on,
      trigger: trigger
    }
  })()

  var AjaxWrapper = (function() {
    var request = function(reqItem) {
      return new Promise(function(resolve, reject) {
        var oReq = new XMLHttpRequest();
        oReq.onload = function(e) {
          console.log(this.status);
          if (this.status >=200 && this.status < 300) {
            // debugger;
            resolve(this.response);
          }
          else {
            reject();
          }
        }
        oReq.open("GET", reqItem.url);
        oReq.send();
      });
    }



    return {
      request: request
    }
  })()

  var hide = function(selector) {
    return DOM.hide(selector);
  }

  var show = function (selector){
    return DOM.show(selector)
  }
  var select = function(selector){
    return SweetSelector.select(selector);
  }
  var addClass = function(className, otherClassName){
    return DOM.addClass(className, otherClassName);
  }
  var removeClass = function(className, otherClassName){
    return DOM.removeClass(className, otherClassName)
  }
  var on = function (selector, eventname, functionname){
    return EventDispatcher.on(selector, eventname, functionname);
  }
  var trigger = function (selector, eventname){
    return EventDispatcher.trigger(selector, eventname);
  }
  var ajax = function(reqItem){
    return AjaxWrapper.request(reqItem);
  }

  var html = function(reqItem){
    return DOM.html(reqItem)
  }

  return {
    SweetSelector: SweetSelector,
    DOM: DOM,
    AjaxWrapper: AjaxWrapper,
    EventDispatcher: EventDispatcher,
    hide: hide,
    show: show,
    addClass: addClass,
    removeClass: removeClass,
    select: select,
    on: on,
    trigger: trigger,
    ajax: ajax,
    ready: ready,
    html: html
  }
})()

miniQuery.ready(function() {
  var templateScript = miniQuery.html("#list-template");
  var template = Handlebars.compile(templateScript);
  var peopleRequest = miniQuery.ajax({url: 'http://localhost:3000/people'});
  var people = {};

  peopleRequest.then(function(response) {
    people = response;
    // console.log("People: ");
    // console.log(people);
    var templatehtml = template({people: JSON.parse(people)});
    console.log("Template HTML: " + templatehtml);
    miniQuery.select("#list-placeholder").innerHTML = templatehtml;
    nameListener();
  });

  peopleRequest.catch(function(error) {
    console.log(error);
  });

  var nameListener = function() {
    miniQuery.on('#list-placeholder', 'click', function(e){
      e.preventDefault();
      nameClick(e.target.id)
    })
  }

  var nameClick = function(personID) {
    var templateScript = miniQuery.html("#badge-template");
    var template = Handlebars.compile(templateScript);
    var badgesRequest = miniQuery.ajax({url: 'http://localhost:3000/people/' + personID + '/badges'});
    var badges = {};

    badgesRequest.then(function(response) {
      badges = response;
      console.log(badges)
      var templatehtml = template({badges: JSON.parse(badges)});
      console.log(templatehtml)
      miniQuery.select("#badge-placeholder" + personID).innerHTML = templatehtml;
    })
  }
})
