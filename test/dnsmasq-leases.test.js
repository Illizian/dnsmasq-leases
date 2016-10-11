const expect = require('expect.js');
const leases = require('../.');

const invalid = '00:00:00:00:00:01 192.168.0.1 host1 *';
const single = '1476175366 00:00:00:00:00:01 192.168.0.1 host1 *';
const multi = '1476175366 00:00:00:00:00:01 192.168.0.1 host1 *\n1476175366 00:00:00:00:00:02 192.168.0.2 host2 *';
const several = [
  '1476175366 00:00:00:00:00:01 192.168.0.1 host1 *',
  '1476175366 00:00:00:00:00:02 192.168.0.2 host2 *',
  '1476175366 00:00:00:00:00:03 192.168.0.3 host3 *',
  '1476175366 00:00:00:00:00:04 192.168.0.4 host4 *',
  '1476175366 00:00:00:00:00:05 192.168.0.5 host5 *',
  '1476175366 00:00:00:00:00:06 192.168.0.6 host6 *',
  '1476175366 00:00:00:00:00:07 192.168.0.7 host7 *',
  '1476175366 00:00:00:00:00:08 192.168.0.8 host8 *',
  '1476175366 00:00:00:00:00:09 192.168.0.9 host9 *',
  '1476175366 00:00:00:00:00:10 192.168.0.10 host10 *'
].join('\n');

describe('dnsmasq parser', function() {
  it('should extract the correct details from a test string with a single lease', function() {
    let results = leases(single);

    expect(results.length).to.equal(1);
    expect(results[0]).to.eql({
      timestamp: '1476175366',
      mac: '00:00:00:00:00:01',
      ip: '192.168.0.1',
      host: 'host1',
      id: '*'
    });
  });

  it('should extract the correct details from a test string with 2 leases', function() {
    let results = leases(multi);

    expect(results.length).to.equal(2);
    expect(results[0]).to.eql({
      timestamp: '1476175366',
      mac: '00:00:00:00:00:01',
      ip: '192.168.0.1',
      host: 'host1',
      id: '*'
    });
    expect(results[1]).to.eql({
      timestamp: '1476175366',
      mac: '00:00:00:00:00:02',
      ip: '192.168.0.2',
      host: 'host2',
      id: '*'
    });
  });

  it('should extract all the elements from a test string with 10 leases', function() {
    let results = leases(several);

    expect(results.length).to.equal(10);
  });

  it('should throw an exception if a string contains an invalid lease', function() {
    expect(leases).withArgs(invalid).to.throwException();
  });
});
