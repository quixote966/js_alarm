/**
 * @author Will Rhodes
 */


function Alarm(hr,min,alarmsDiv) {
//	this.hour = hr;
//	this.minute = min;
	this.time = new Date(0);
	this.time.setHours(hr, min);
	this.fired = false;
	this.alarmView=new AlarmView(this.time,alarmsDiv);
	// TODO should handle AM/PM and locale
	
	this.equal = function(date) {
		return date.getHours() === this.time.getHours() && date.getMinutes() === this.time.getMinutes();
	};
	
	this.check = function(date) {
		if (this.equal(date) && !this.fired) {
			console.log("the alarm has happened");
			this.fired = true;
			this.alarmView.fire();
		}
	};
	
}

function ClockView() {
	this.clockDiv = document.getElementById("clock");
	
	this.update = function(date) {
		this.clockDiv.textContent = date.toLocaleTimeString("en-US");
	};
}

function AlarmView(time,alarmsDiv) {
	this.time = time;
	this.elem = document.createElement('div');
	this.elem.classList.add('alarm_view');
	this.elem.textContent = time.toLocaleTimeString("en-US");
	alarmsDiv.appendChild(this.elem);
	
	this.fire = function() {
		// TODO Make this do more. Also, prep the CSS
		this.elem.classList.add('alarm_firing');
	};
	
	this.cancel = function () {
		this.elem.classList.remove('alarm_firing');
	};

}



function AlarmClock() {
	this.alarms = new Array();
	this.clockView = new ClockView();
	console.log(this.clockView);
	this.alarmsDiv = document.getElementById("alarmsList");
	var parent = this;
	this.heartbeat = function() {
		console.log('lubdub');
		var beat = new Date();
		setTimeout (function () {
			parent.clockView.update(beat);
			parent.checkAlarms(beat);
			parent.heartbeat();
		}, 1000);
	};

	this.checkAlarms = function(date) {
		this.alarms.forEach(function(alarm) {
			console.log(date);
			alarm.check(date);
		});
	};

	this.setAlarm = function (hr,min) {
		console.log("setting alarm "+hr+":"+min);
		if (hr >= 0 && 
			hr < 24 &&
			min >= 0 &&
			min < 60) {
			// create an alarm object.
			alarm = new Alarm(hr,min,this.alarmsDiv);
			this.alarms.push(alarm);
			
		} else {
			// TODO display an error.
		}
	}

}


document.onreadystatechange = function() {
	  if(document.readyState === "interactive") {
		  var app=new AlarmClock();
		  console.log("app?");
		  var form = document.getElementById("alarmForm");
		  form.addEventListener("submit",function(event) {
			  event.preventDefault();
			  var hour = parseInt(form.hour.value);
			  var min = parseInt(form.minute.value);
			  app.setAlarm(hour, min);
		  });
		  app.heartbeat();
	  }
};


