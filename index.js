function _interopDefault$1(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var helpers = require('babel-plugin-transform-async-to-promises/helpers');

var React = require('react');

var React__default = _interopDefault$1(React);

var reactNativeDeviceInfo = require('react-native-device-info');

var apiCall = function apiCall(_ref) {
  var endpoint = _ref.endpoint,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      _ref$body = _ref.body,
      body = _ref$body === void 0 ? {} : _ref$body;

  try {
    return Promise.resolve(helpers._catch(function () {
      return Promise.resolve(fetch(endpoint, {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(body)
      })).then(Promise.resolve);
    }, function (err) {
      console.error(err);
      throw err;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var ENDPOINT = 'http://localhost:8000';

function ABExperiment(_ref) {
  var record = function record(metric) {
    try {
      var _temp2 = helpers._catch(function () {
        return Promise.resolve(apiCall({
          endpoint: ENDPOINT + "/api/record",
          method: 'POST',
          body: {
            deviceId: token,
            metric: metric,
            variant: variant,
            experimentToken: token
          }
        })).then(function () {});
      }, function (err) {
        consol.error(err);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var fetchVariant = function fetchVariant() {
    try {
      var _temp4 = helpers._catch(function () {
        return Promise.resolve(reactNativeDeviceInfo.getUniqueId()).then(function (deviceId) {
          return Promise.resolve(apiCall({
            endpoint: ENDPOINT + "/api/initialize/" + deviceId + "/" + token,
            method: 'GET'
          })).then(function (variantPayload) {
            setVariant(variantPayload.variant);
          });
        });
      }, function (err) {
        console.error(err);
        setVariant('a');
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var componentA = _ref.componentA,
      componentB = _ref.componentB,
      token = _ref.token,
      _ref$track = _ref.track,
      track = _ref$track === void 0 ? ['impression', 'interaction'] : _ref$track,
      _ref$onClick = _ref.onClick,
      _onClick = _ref$onClick === void 0 ? null : _ref$onClick;

  var _useState = useState(null),
      variant = _useState[0],
      setVariant = _useState[1];

  useEffect(function () {
    fetchVariant();
  }, []);
  useEffect(function () {
    if (variant && track.includes('impression')) {
      record('impression');
    }
  }, [variant]);

  if (variant) {
    return null;
  }

  var ComponentReturn = variant === 'a' ? componentA : componentB;
  return /*#__PURE__*/React__default.createElement(ComponentReturn, {
    onClick: function onClick() {
      record('interaction');

      _onClick();
    }
  });
}

module.exports = ABExperiment;
//# sourceMappingURL=index.js.map
