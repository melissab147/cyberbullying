var socket = io();

var MainFrame = React.createClass({
    render: function() {
        return (
            <div>
                <button>Yes</button>
                <button>No</button>
            </div>
        )
    }
});

React.render(
    <MainFrame url='http://localhost:3000/sources'  />,
    document.getElementById('content')
)
