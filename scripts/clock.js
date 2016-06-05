var Clock = React.createClass({
  getTime: function() {
    var hourFormat = "hh:mm"; // default
    var ap = moment().format('a');

    if (this.state.format24) {
        hourFormat = "HH:mm";
        ap = ""; // don't show am/pm in 24 hr time

        if (this.state.showSeconds) {
            hourFormat = "HH:mm:ss";
        }

    } else if (this.state.showSeconds) {
        hourFormat = "hh:mm:ss";
    }

    var t = moment().format(hourFormat);

    this.setState({curTime: t, amPm: ap});
  },

  toggleSeconds: function() {
      if ($("#toggleSeconds").is(':checked')) {
          this.setState({showSeconds: true});
      } else {
          this.setState({showSeconds: false});
      }
  },

  toggle24: function() {
      if ($("#toggle24").is(':checked')) {
          this.setState({format24: true});
      } else {
          this.setState({format24: false});
      }
  },

  getInitialState: function() {
    return {format24: false, seconds: false};
  },

  componentDidMount: function() {
    this.getTime();
    setInterval(this.getTime, this.props.pollInterval);
    $("#toggleSeconds").click(this.toggleSeconds);
    $("#toggle24").click(this.toggle24);
  },

  render: function() {
    return (
      <main>

          <div id="toggles">
            <div className="toggle">
                  <label for="toggleSeconds">Show seconds</label>
                  <input type="checkbox" name="toggleSeconds" id="toggleSeconds"/>
            </div>

            <div className="toggle">
                  <label for="toggle24">24-hour time</label>
                  <input type="checkbox" name="toggle24" id="toggle24"/>
            </div>
          </div>

          <div className="clock">
                <p>{this.state.curTime} <span className="amPm">{this.state.amPm}</span> </p>
          </div>
      </main>
    );
  }

});

ReactDOM.render(
    <Clock pollInterval={1000} />,
    document.getElementById('content')
);

