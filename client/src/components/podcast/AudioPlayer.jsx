const AudioPlayer = ({ audioUrl }) => {
  return (
    <div className="audio-player">
      <audio controls src={audioUrl}>
        Your browser does not support audio.
      </audio>
    </div>
  );
};

export default AudioPlayer;
