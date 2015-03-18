var socket = io();

var MainFrame = React.createClass({

    confirmBullying: function() {
        console.log("Heard click")
        socket.emit('survey:yes');
    },
    denyBullying: function() {
        console.log("Heard click")
        socket.emit('survey:no')
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
    <MainFrame url='http://localhost:3000/sources'  />,
    document.getElementById('content')
)
