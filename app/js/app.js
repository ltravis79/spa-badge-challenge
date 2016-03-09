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
    var SweetSelector = function(el) {
      SweetSelectorObj = new SweetSelector.prototype.init(el);
      return SweetSelectorObj;
    }

    SweetSelector.prototype = {
      init: function(el) {
        this.selector = SweetSelector.prototype.select(el);
        return this;
      },

      html: function() {
        return this.selector.innerHTML;
      },

      select: function(selector){
        if (selector.substring(0,1) == '#'){
          return queryId(selector.substring(1));
        }
        else if (selector.substring(0,1) == '.'){
          return queryClass(selector.substring(1));
        }
        else {
          debugger;
          return queryTag(selector);
        }
      },

      on: function(selector, eventname, functionname, delagator){
        SweetSelector.prototype.select(selector).addEventListener(eventname, functionname);
        console.log(this);
    },

      selector: ""
    }

    SweetSelector.prototype.init.prototype = SweetSelector.prototype;

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
    window.SweetSelector = SweetSelector;
    return SweetSelector;
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
    var on = function(selector, eventname, functionname, delagator){
      // debugger
      if (typeof delegator === undefined) {
        SweetSelector.select(selector).addEventListener(eventname, functionname);
      } else {

      }
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
  // var templateScript = miniQuery.html("#list-template");
  templateScript = SweetSelector("#list-template").html();
  // console.log("Template Script: " + templateScript)
  var template = Handlebars.compile(templateScript);
  // console.log("Template: " + template)

  var peopleRequest = miniQuery.ajax({url: 'http://localhost:3000/people'});

  var people = {};

  peopleRequest.then(function(response) {
    people = response;
    // console.log("People: ");
    // console.log(people);
    var templatehtml = template({people: JSON.parse(people)});
    // console.log("Template HTML: " + templatehtml);
    // miniQuery.select("#list-placeholder").innerHTML = templatehtml;
    SweetSelector("#list-placeholder").selector.innerHTML = templatehtml;


  });

  peopleRequest.catch(function(error) {
    console.log(error);
  });

  // miniQuery.on("a", "click", function(e) {
  //   e.preventDefault();
  //   console.log("Fucking javascript");
  //   console.log(this);
  //   console.log(miniQuery.select(this.id));
  // })
  SweetSelector('#list-placeholder').on('a', 'click', function(e){
    e.preventDefault();
    console.log("fucking javascript")
    console.log(this)
  })

//   var blah = miniQuery.select('#list-placeholder')
//   var bla = miniQuery.on("a", "click", function(e){
//     e.preventDefault();
//   //    debugger
//   console.log(this)
// })
//   blah.bla
})
