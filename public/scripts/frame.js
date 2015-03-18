var socket = io();

var MainFrame = React.createClass({
    retrieveData: function() {
        socket.emit('data:retrieve')
    },
    getData: function(data) {
        this.setState({data: data});
        console.log(this.state.data[0], "id: ",this.state.data[0].profile_owner_id);
    },
    getInitialState: function() {
        socket.on('data:send', this.getData)
        return {data: []}
    },
    componentDidMount: function() {
        this.retrieveData();
    },
    render: function() {
        if (this.state.data){
            console.log(this.state.data);

            var result = this.state.data[0];

            return (
                <div className="mainPage">
                    <div className="three columns instructions verticalLine">
                        <h3>Instructions:</h3>
                        <p>The purpose of this research is to better understand cyberaggression and cyberbullying in online social networks. Please help us by answering the questions for each image and its associated posts on Instagram. Use the definitions below to answer the questions about the different types of content that is posted.</p>
                        <p><b>Cyberaggression</b> is broadly defined as using digital media to intentionally harm another person. Examples include negative content and words such as profanity, slang and abbreviations that would be used in negative posts such as hate, fight, wtf.</p>
                        <p><b>Cyberbullying</b> is one form of cyberaggression that is more restrictively defined as intentional aggression that is repeatedly carried out in an electronic context against a person who cannot easily defend him or herself. Thus, cyberbullying consists of three main features: (1) an act of aggression online; (2) an imbalance of power between the individuals involved; and (3) it is repeated over time. An imbalance of power can include posts against an individual who cannot easily defend him or herself and or can include several individuals negatively targeting one individual.</p>
                        <ul>
                            <li>Definition of a victim: The individual that is the target of aggression/insult/harassment.</li>
                            <li>Definition of a perpetrator: The individual who posts aggressive/insulting/harassing/ unwanted questions/comments.</li>
                            <li>Definition of defenders: Individuals with posts that dislike the cyberbullying and defend the victim from the perpetrators of aggression/insults/harassment. The goal of the defender is to help the victim who is being cyberbullied, even with usage of offensive words by attacking the perpetrators.</li>
                            <li>Definition of a follower: Individuals that take an active part in cyberaggression or cyberbullying but do not start the cyberaggression or cyberbullying.</li>
                        </ul>
                        <h3>Process:</h3>
                        <ol>
                            <li>Read each post</li>
                            <li>Answer the questions about the image and its posts, using the best of your ability</li>
                        </ol>
                    </div>
                    <div className="viewPost eight columns">
                        <ViewPost ref="viewPost"/>
                    </div>
                </div>

            )
        }
        else{
            return (
                <h2>No data</h2>
            );
        }
    }
});

React.render(
    <MainFrame />,
    document.getElementById('content')
)
