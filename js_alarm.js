/**
 * @author Will Rhodes
 */
var alarms = new Array();

function heartbeat() {
	// Send a new message every second, containing a new Date Object for comparison
	console.log('lubdub');
	var beat = new Date();
	setTimeout (function () {
		updateClockView(date);
		checkAlarms(date);
		heartbeat();
	}, 1000);
}

function Alarm(hr,min) {
	this.hour = hr;
	this.minute = min;
	this.fired = false;
	t = this;
	// TODO should handle AM/PM and locale
}

Alarm.prototype.equal = function(date) {
	return date.getHours() === this.hour && date.getMinutes() === this.minute;
};

Alarm.prototype.check = function(date) {
	if (t.equal(date) && !this.fired) {
		console.log("the alarm has happened");
		window.alert("the alarm has happened!");
		this.fired = true;
	}
};


function setAlarm(hr,min) {
	console.log("setting alarm "+hr+":"+min);
	if (hr >= 0 && 
		hr < 24 &&
		min >= 0 &&
		min < 60) {
		// create an alarm object.
		alarm = new Alarm(hr,min);
		alarms.push(alarm);
		// TODO update view
		
	} else {
		// TODO display an error.
	}
}

function alarmView()

var checkAlarms = function(date) {
	alarms.forEach(function(alarm) {
		console.log(date);
		alarm.check(date);
	});
}

document.onreadystatechange = function() {
	  if(document.readyState === "interactive") {
		  heartbeat();
	  }
};


