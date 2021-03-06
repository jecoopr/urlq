const assert = require('chai').assert;
const urlq = require('../index.js');

const q1 = '?sections=carbs,dessert&diets=gluten-free';
const q2 = '?sections=carbs,dessert';


describe('addVal()', function() {
  it('Should add a new query param and value if the query is an empty string', function() {
    var res = urlq.addVal('', 'sections', 'carbs');
    assert.strictEqual(res, '?sections=carbs');
  });

  it('Should add a new query param and value if param does not exist', function() {
    var res = urlq.addVal(q2, 'diets', 'gluten-free');
    assert.strictEqual(res, '?sections=carbs,dessert&diets=gluten-free');
  });

  it('Should add a value to an existing query param', function() {
    var res = urlq.addVal(q1, 'sections', 'dips');
    assert.strictEqual(res, '?sections=carbs,dessert,dips&diets=gluten-free');
  });
});

describe('getParam()', function() {
  it('Should return an array of values for a query param', function() {
    var res = urlq.getParam(q1, 'sections');
    assert.deepEqual(res, ['carbs', 'dessert']);
  });

  it('Should return an empty array for a non-existing query param', function() {
    var res = urlq.getParam(q1, 'not-in');
    assert.deepEqual(res, []);
  });
});

describe('makeValidQuery()', function() {

});

describe('removeVal()', function() {
  it('Should remove a value from a query param', function() {
    var res = urlq.removeVal(q1, 'sections', 'carbs');
    assert.strictEqual(res, '?sections=dessert&diets=gluten-free');
  });

  it('Should return the same query if the value to remove is not in it', function() {
    var res = urlq.removeVal(q1, 'sections', 'pizza');
    assert.strictEqual(res, q1);
  });

  it('Should return the same query if the param is not in it', function() {
    var res = urlq.removeVal(q1, 'not-in', 'carbs');
    assert.strictEqual(res, q1);
  });
});

describe('removeParam()', function() {
  it('Should remove a param from a query', function() {
    var res = urlq.removeParam(q1, 'sections');
    assert.strictEqual(res, '?diets=gluten-free');
  });

  it('Should return an empty string if it was the only param in the query', function() {
    var res = urlq.removeParam(q2, 'sections');
    assert.strictEqual(res, '');
  });

  it('Should return the same query if the param to remove is not in it', function() {
    var res = urlq.removeParam(q1, 'not-in');
    assert.strictEqual(res, q1);
  });
});

describe('updateParam()', function() {
  it('Should remove the param if it does not have values', function() {
    var res = urlq.updateParam(q1, 'sections', []);
    var res2 = urlq.updateParam(q1, 'diets', []);
    assert.strictEqual(res, '?diets=gluten-free');
    assert.strictEqual(res2, '?sections=carbs,dessert');
  });

  it('Should replace the param values with the new values', function() {
    var res = urlq.updateParam(q1, 'sections', ['pizza', 'sauce', 'soup']);
    assert.strictEqual(res, '?sections=pizza,sauce,soup&diets=gluten-free');
  });

  it('Should add a param to the end of the query if it does not exist', function() {
    var res = urlq.updateParam(q2, 'diets', ['gluten-free']);
    assert.strictEqual(res, '?sections=carbs,dessert&diets=gluten-free');
  });
});
