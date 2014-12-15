// UI STATE SERVICE

GF.factory("UIStateService", function() {
  var state = {
    dashboard: true,
    browse: false
  };

  return {
    setState: function(newState) {
      for(var k in state) {
        state[k] = false; 
      }

      state[newState] = true; 
    },

    getState: function() {
      for(var k in state) {
        if(state[k]) {
          return k; 
        }
      }   
    }
  };
});
