// UI STATE SERVICE

GF.factory("UIStateService", function() {
  var state = {
    dashboard: true,
    browse: false
  };

  return {
    is: function(checkState) {
      return state[checkState]; 
    },

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
