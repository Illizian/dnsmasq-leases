# dnsmasq-leases
### Parses dnsmasq lease file declarations

This module is inspired by the [dhcpd-leases module](https://www.npmjs.com/package/dhcpd-leases), however for the DNSMASQ leases file. The dnsmasq.leases file doesn't appear to have a formal specification but several confirmations of the format exist within the [dnsmasq-discuss mailing list](http://lists.thekelleys.org.uk/pipermail/dnsmasq-discuss/2016q2/010595.html), so I have opted to used these.

### Installation

Install the module

```
npm install --save dhcpd-leases
```

### Usage

```js
const leases = require('dhcpd-leases');
const fs = require('fs');

let data = fs.readFileSync('/var/lib/misc/dnsmasq.leases', 'utf8');
console.log(leases(data));
/* logs
[
  {
    timestamp: 2016-10-12T07:59:41.510Z,
    mac: '00:00:00:00:00:00',
    ip: '192.168.0.1',
    host: 'dnsmasq',
    id: '*'
  }
]
*/
```
### Testing

The module has been tested with a limited set of dnsmasq lease examples. Please feel free to add more.