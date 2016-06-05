var Clock = React.createClass({
  getTime: function() {
    var t = moment().format(this.state.hourFormat);
    var ap = moment().format('a');
    this.setState({curTime: t, amPm: ap});
  },

  toggleSeconds: function() {
      if ($("#toggleSeconds").is(':checked')) {
          this.setState({hourFormat: 'hh:mm:ss'});
      } else {
          this.setState({hourFormat: 'hh:mm'});
      }
  },

  getInitialState: function() {
    return {hourFormat: 'hh:mm'};
  },

  componentDidMount: function() {
    this.getTime();
    setInterval(this.getTime, this.props.pollInterval);
    $("#toggleSeconds").click(this.toggleSeconds);
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

