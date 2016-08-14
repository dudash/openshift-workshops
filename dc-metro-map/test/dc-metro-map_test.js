// This test only passes if the current system time is a odd minute
exports.passOnOddMinute = function(test) {

  var date = new Date();
  var minutes = date.getMinutes();
    
  test.ok(minutes % 2 === 1, "this assertion should pass");
  test.done();
};
