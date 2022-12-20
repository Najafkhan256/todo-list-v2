// Method 1
/*module.exports.getDate = getDate;

 function getDate() {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  const currentDate = today.toLocaleDateString("en-US", options);

  return currentDate;
}

module.exports.getDay = getDay;

function getDay() {
  const today = new Date();
  const options = {
    weekday: "long"
  };
  const currentDate = today.toLocaleDateString("en-US", options);

  return currentDate;
}

console.log(module.exports); */

// Method 2
/* module.exports.getDate = getDate;

const getDate = function() {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  const currentDate = today.toLocaleDateString("en-US", options);

  return currentDate;
};

module.exports.getDay = getDay;

const getDay = function() {
  const today = new Date();
  const options = {
    weekday: "long"
  };
  return today.toLocaleDateString("en-US", options);

};

console.log(module.exports);
 */

// Method 3

/* module.exports.getDate = function() {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return today.toLocaleDateString("en-US", options);

};

module.exports.getDay = function() {
  const today = new Date();
  const options = {
    weekday: "long"
  };
return today.toLocaleDateString("en-US", options);

};

console.log(module.exports); */

// Method 4 Prefferd Method

exports.getDate = function() {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", options);
};

exports.getDay = function() {
  const today = new Date();
  const options = {
    weekday: "long"
  };
  return today.toLocaleDateString("en-US", options);
};
