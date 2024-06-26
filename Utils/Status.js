
let Streaming = false;

function SetStreaming(value) {
    Streaming = value;
}

function GetStreaming() {
    return Streaming;
}

module.exports = {
    SetStreaming,
    GetStreaming,
};
