const matcher = /(\d{10})\s((?:[a-zA-Z0-9]{2}[:-]){5}[a-zA-Z0-9]{2})\s((?:[0-9]{1,3}\.){3}[0-9]{1,3})\s(\S+)\s(\S+)/;

module.exports = function leases(str) {
  return str.split('\n').map((line, index) => {
    let result = matcher.exec(line);
    if (!result) throw new Error(`Unable to parse lease on line ${ index + 1 }`);

    return {
      timestamp: result[1],
      mac: result[2],
      ip: result[3],
      host: result[4],
      id: result[5]
    };
  });
};