var socket = io();

var MainFrame = React.createClass({
    retrieveData: function() {
        socket.emit('data:retrieve')
    },
    getData: function(data) {
        this.setState({data: data});
        console.log(this.state.data);
    },
    confirmBullying: function() {
        console.log("Heard click")
        socket.emit('survey:yes');
    },
    denyBullying: function() {
        console.log("Heard click")
        socket.emit('survey:no')
    },
    getInitialState: function() {
        socket.on('data:send', this.getData)
        return {data: []}
    },
    componentDidMount: function() {
        this.retrieveData();
    },
    render: function() {
        return (
            <div>
                <button onClick={this.confirmBullying}>Yes</button>
                <button onClick={this.denyBullying}>No</button>
            </div>
        )
    }
});

React.render(
    <MainFrame />,
    document.getElementById('content')
)
