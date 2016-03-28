/*-----------------------------------Timer------------------------------------------*/
function CreateTimer() {

  var panel = {
    status: 'Start',
    hh: 0,
    mm: 0,
    sc: 0,
    msc: 0
  };
  var lastPanel = {};
  var stopsList = [];
  var flagStartStop = true;
  var timerId;
  var displayTimer = new DisplayTimer(panel);
  displayTimer.printReset();

  var runTimer = function () {
    displayTimer.printMsc();
    panel.msc +=43;
    if (panel.msc >= 1000) {
      panel.msc = 32;
      panel.sc++;
      displayTimer.printSc();
    }
    if (panel.sc == 60) {
      panel.sc = 0;
      panel.mm++;
      displayTimer.printMm();
    }
    if (panel.mm == 60) {
      panel.mm = 0;
      panel.hh++;
      displayTimer.printHh();
    }
    if (panel.hh == 24) {
      displayTimer.printReset();
      panel.hh = 0;
      panel.mm = 0;
      panel.sc = 0;
      panel.msc = 0;
    }   
  }

  function ClonePanel() {
    this.copy = {};
    for (var key in panel) {
      this.copy[key] = panel[key];
    }
  }
  function getLastClonePanel() {
    for (var key in panel) {
      lastPanel[key] = panel[key];
    }
  }
  function pushSubtractStopItem(copy, status) {
    var tempStopsListItem;
    if (stopsList.length > 0) {
      tempStopsListItem = lastPanel.hh*10000000 + lastPanel.mm*100000 
        + lastPanel.sc * 1000 + lastPanel.msc - 43;
      if (tempStopsListItem < 0) tempStopsListItem = 0;
    } else {
      tempStopsListItem = 0;
    }
    var sumCopy = copy.hh * 10000000 + copy.mm * 100000 + copy.sc * 1000 + copy.msc - 43;
    if (sumCopy < 0) { sumCopy = 0; }
    sumCopy = sumCopy - tempStopsListItem;
    copy.hh = (sumCopy - sumCopy % 10000000)/10000000;
    copy.mm = (sumCopy - sumCopy % 100000)/100000;
    copy.sc = (sumCopy - sumCopy % 1000)/1000;
    copy.msc = sumCopy % 1000;
    copy.status = status;
    stopsList.push(copy);
    getLastClonePanel();
  }
  /*---event handlers click (start/stop, split, reset)---*/
  this.startStopTimer = function () {
    if (flagStartStop) {
      flagStartStop = false;
      timerId = setInterval(runTimer, 43);
      panel.status = 'Stop';
    } else {
      flagStartStop = true;
      clearInterval(timerId);
      var copyPanel = new ClonePanel().copy;
      pushSubtractStopItem(copyPanel, 'Stop');
      displayTimer.printSplitItem(stopsList[stopsList.length - 1]);
      panel.status = 'Start';
    }
    displayTimer.printButtonStartStop(panel.status);
  }

  this.splitTimer = function () {
    if (!flagStartStop) {
      var copyPanel = new ClonePanel().copy;
      pushSubtractStopItem(copyPanel, 'Split');
      displayTimer.printSplitItem(stopsList[stopsList.length - 1]);
    }
  }

  this.resetTimer = function () {
    clearInterval(timerId);
    displayTimer.printReset();
    flagStartStop = true;
    stopsList = [];
    panel.status = 'Start';
    panel.msc = 0;
    panel.sc = 0;
    panel.mm = 0;
    panel.hh = 0;
  }
}

/*-----------------------------------DisplayTimer------------------------------------------*/
function DisplayTimer(panel) {
  this.printMsc = function() {
    if (panel.msc < 10) {
      document.getElementsByClassName('msc')[0].innerHTML = '.00' + panel.msc;
    }
    if (panel.msc >= 10 & panel.msc < 100) {
      document.getElementsByClassName('msc')[0].innerHTML = '.0' + panel.msc;
    }
    if (panel.msc >= 100) {
      document.getElementsByClassName('msc')[0].innerHTML = '.' + panel.msc;
    }
  }

  this.printSc = function() {
    if (panel.sc < 10) {
      document.getElementsByClassName('sc')[0].innerHTML = ':0' + panel.sc;
    } else {
      if (panel.sc === 60) {
        document.getElementsByClassName('sc')[0].innerHTML = ':00';
      } else {
        document.getElementsByClassName('sc')[0].innerHTML = ':' + panel.sc;
      }
    }
  }

  this.printMm = function() {
    if (panel.mm < 10) {
      document.getElementsByClassName('mm')[0].innerHTML = ':0' + panel.mm;
    } else {
      if (panel.mm === 60) {
        document.getElementsByClassName('mm')[0].innerHTML = ':00';
      } else {
        document.getElementsByClassName('mm')[0].innerHTML = ':' + panel.mm;
      }
    }
  }

  this.printHh = function() {
    if (panel.hh < 10) {
      document.getElementsByClassName('hh')[0].innerHTML = ' 0' + panel.hh;
    } else {
      document.getElementsByClassName('hh')[0].innerHTML = ' ' + panel.hh;
    }
  }

  this.printReset = function() {
    document.getElementsByClassName('msc')[0].innerHTML = '.000';
    document.getElementsByClassName('sc')[0].innerHTML = ':00';
    document.getElementsByClassName('mm')[0].innerHTML = ':00';
    document.getElementsByClassName('hh')[0].innerHTML = ' 00';
    document.getElementsByClassName('list')[0].innerHTML = '';
  }

  this.printSplitItem = function (stopListItem) {
    var splitItem = document.createElement('li');
    splitItem.classList.add('list-group-item');
    if (stopListItem.status === 'Split') splitItem.classList.add('list-group-item-info');
    if (stopListItem.status === 'Stop') splitItem.classList.add('list-group-item-danger');
    stopListItem = convertToString(stopListItem);
    splitItem.innerHTML = stopListItem.status + stopListItem.hh + stopListItem.mm + stopListItem.sc + stopListItem.msc;
    document.getElementsByClassName('list')[0].appendChild(splitItem);
  }

  this.printButtonStartStop = function (startStop) {
    document.getElementsByClassName('start')[0].innerHTML = startStop;
  }

  function convertToString(elem) {
    if (elem.hh < 10) elem.hh = ' 0' + elem.hh;
    if (elem.mm < 10) elem.mm = ':0' + elem.mm;
    if (elem.mm > 10) elem.mm = ':' + elem.mm;
    if (elem.mm === 60) elem.mm = ':00';
    if (elem.sc < 10) elem.sc = ':0' + elem.sc;
    if (elem.sc > 10) elem.sc = ':' + elem.sc;
    if (elem.sc === 60) elem.sc = ':00';
    if (elem.msc < 10) elem.msc = '.00' + elem.msc;
    if (elem.msc >= 10 & elem.msc < 100) elem.msc = '.0' + elem.msc;
    if (elem.msc >= 100) elem.msc = '.' + elem.msc;

    return elem;
  }
}
/*-----------------------------------------------------------------------------*/


var timer = new CreateTimer();
document.getElementsByClassName('start')[0].addEventListener('click', timer.startStopTimer);
document.getElementsByClassName('split')[0].addEventListener('click', timer.splitTimer);
document.getElementsByClassName('reset')[0].addEventListener('click', timer.resetTimer);
