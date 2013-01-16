// Generated by CoffeeScript 1.4.0
(function() {
  var App, log,
    __slice = [].slice;

  log = console.log.bind(console);

  App = {
    init: function() {
      var ws;
      this.ws = ws = new WebSocket("ws://" + location.host);
      ws.onopen = this.cb.open;
      ws.onmessage = this.cb.message;
      return ws.onclose = this.cb.close;
    },
    msg: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.ws.send(JSON.stringify(args));
    },
    cb: {
      open: function() {
        var name, pid, qid;
        qid = location.hash.slice(1);
        pid = localStorage.pid, name = localStorage.name;
        if (!pid) {
          pid = localStorage.pid = Math.floor(Math.random() * 1e8);
        }
        return App.msg('q', qid, pid, name);
      },
      message: function(e) {
        var args, type, _ref;
        _ref = JSON.parse(e.data), type = _ref.type, args = _ref.args;
        return App.cb[type].apply(App, args);
      },
      close: function() {
        return log('close');
      },
      idx: function(idx) {
        return log(idx);
      }
    }
  };

  App.init();

}).call(this);