import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import N from 'normalizr';

moduleForAcceptance('Acceptance | sanity');

test('proper import', function(assert) {
  assert.ok(N, 'should have import');
  assert.ok(N.schema, 'should have schema');
  assert.equal(typeof N.normalize, 'function', 'should be function');
});
