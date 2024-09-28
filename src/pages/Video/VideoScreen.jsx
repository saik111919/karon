import { useState, useRef, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Repeat,
  FastForward,
  Settings,
  Upload,
} from "lucide-react";

const VideoPlayer = ({ initialVideoSrc }) => {
  const [state, setState] = useState({
    videoSrc: initialVideoSrc || "",
    isPlaying: false,
    volume: 1,
    isMuted: false,
    currentTime: 0,
    duration: 0,
    isFullscreen: false,
    playbackRate: 1,
    isLooping: false,
    isSettingsOpen: false,
    isControlsVisible: true,
    isVolumeHovered: false,
    videoError: null,
  });

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const updateState = useCallback(
    (newState) => setState((prev) => ({ ...prev, ...newState })),
    []
  );

  useEffect(() => {
    const handleFullscreenChange = () =>
      updateState({ isFullscreen: !!document.fullscreenElement });
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [updateState]);

  useEffect(() => {
    if (state.videoSrc) videoRef.current.load();
  }, [state.videoSrc]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      updateState({
        videoSrc: fileURL,
        isPlaying: false,
        currentTime: 0,
        videoError: null,
      });
    }
  };

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (state.isPlaying) {
        video.pause();
        updateState({ isPlaying: false });
      } else {
        video.play().catch((error) => {
          updateState({ videoError: "Failed to play video: " + error.message });
        });
        updateState({ isPlaying: true });
      }
    }
  }, [state.isPlaying, updateState]);

  const handleDoubleClick = useCallback((e) => {
    const video = videoRef.current;
    if (!video) return;
    const { clientX, target } = e;
    const { left, width } = target.getBoundingClientRect();
    const clickPosition = (clientX - left) / width;
    video.currentTime += clickPosition < 0.5 ? -10 : 10;
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !state.isMuted;
      updateState({ isMuted: !state.isMuted });
    }
  }, [state.isMuted, updateState]);

  const handleVolumeChange = useCallback(
    (e) => {
      const newVolume = parseFloat(e.target.value);
      updateState({ volume: newVolume, isMuted: newVolume === 0 });
      if (videoRef.current) videoRef.current.volume = newVolume;
    },
    [updateState]
  );

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current)
      updateState({ currentTime: videoRef.current.currentTime });
  }, [updateState]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) updateState({ duration: videoRef.current.duration });
  }, [updateState]);

  const handleSeek = useCallback(
    (e) => {
      const seekTime = parseFloat(e.target.value);
      updateState({ currentTime: seekTime });
      if (videoRef.current) videoRef.current.currentTime = seekTime;
    },
    [updateState]
  );

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours > 0 ? `${hours}:` : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlaybackRateChange = useCallback(
    (rate) => {
      updateState({ playbackRate: rate, isSettingsOpen: false });
      if (videoRef.current) videoRef.current.playbackRate = rate;
    },
    [updateState]
  );

  const toggleLoop = useCallback(() => {
    const newLoopState = !state.isLooping;
    updateState({ isLooping: newLoopState });
    if (videoRef.current) videoRef.current.loop = newLoopState;
  }, [state.isLooping, updateState]);

  const showControls = useCallback(() => {
    updateState({ isControlsVisible: true });
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(
      () => updateState({ isControlsVisible: false }),
      3000
    );
  }, [updateState]);

  const handleVideoError = (e) => {
    updateState({ videoError: `Error: ${e.target.error.message}` });
  };

  const renderControls = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 py-6"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ControlButton
              Icon={RotateCcw}
              onClick={() => (videoRef.current.currentTime -= 10)}
              tooltip="Rewind 10s"
            />
            <ControlButton
              Icon={state.isPlaying ? Pause : Play}
              onClick={togglePlay}
              className="text-black hover:bg-gray-200"
              tooltip={state.isPlaying ? "Pause" : "Play"}
            />
            <ControlButton
              Icon={FastForward}
              onClick={() => (videoRef.current.currentTime += 10)}
              tooltip="Forward 10s"
            />
          </div>
          <div className="flex items-center space-x-4">
            <VolumeControl
              state={state}
              toggleMute={toggleMute}
              handleVolumeChange={handleVolumeChange}
              updateState={updateState}
            />
            <ControlButton
              Icon={Repeat}
              onClick={toggleLoop}
              className={state.isLooping ? "text-blue-500" : ""}
              tooltip="Toggle Loop"
            />
            <ControlButton
              Icon={Settings}
              onClick={() =>
                updateState({ isSettingsOpen: !state.isSettingsOpen })
              }
              tooltip="Settings"
            />
            <ControlButton
              Icon={state.isFullscreen ? Minimize : Maximize}
              onClick={toggleFullscreen}
              tooltip={
                state.isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
              }
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="range"
              min="0"
              max={state.duration}
              value={state.currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-600 rounded-full appearance-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                  (state.currentTime / state.duration) * 100
                }%, #4b5563 ${
                  (state.currentTime / state.duration) * 100
                }%, #4b5563 100%)`,
              }}
            />
          </div>
          <span className="text-sm text-gray-300 whitespace-nowrap min-w-[80px] text-right">
            {formatTime(state.currentTime)} / {formatTime(state.duration)}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {state.isSettingsOpen && (
          <SettingsPanel
            playbackRate={state.playbackRate}
            handlePlaybackRateChange={handlePlaybackRateChange}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8">
      <motion.div
        ref={playerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-black rounded-xl shadow-2xl overflow-hidden relative"
        onMouseMove={showControls}
        onMouseLeave={() => updateState({ isControlsVisible: false })}
      >
        <div className="relative aspect-video bg-black">
          {state.videoSrc ? (
            <video
              ref={videoRef}
              src={state.videoSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              onDoubleClick={handleDoubleClick}
              className="w-full h-full object-contain cursor-pointer"
              loop={state.isLooping}
              onError={handleVideoError}
              onPause={() => updateState({ isPlaying: false })}
              onPlay={() => updateState({ isPlaying: true })}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 bg-gray-800">
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="video/*"
                />
                <Upload />
              </label>
            </div>
          )}
          {state.videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-center p-4">
              {state.videoError}
            </div>
          )}
        </div>
        <AnimatePresence>
          {state.isControlsVisible && renderControls()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const ControlButton = ({ Icon, onClick, tooltip, className }) => (
  <button
    onClick={onClick}
    className={`p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${className}`}
    title={tooltip}
  >
    <Icon className="w-6 h-6" />
  </button>
);

const VolumeControl = ({
  state,
  toggleMute,
  handleVolumeChange,
  updateState,
}) => (
  <div
    className="flex items-center space-x-2 group relative"
    onMouseEnter={() => updateState({ isVolumeHovered: true })}
    onMouseLeave={() => updateState({ isVolumeHovered: false })}
  >
    <ControlButton
      Icon={state.isMuted || state.volume === 0 ? VolumeX : Volume2}
      onClick={toggleMute}
      tooltip={state.isMuted ? "Unmute" : "Mute"}
    />
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: state.isVolumeHovered ? "auto" : 0,
        opacity: state.isVolumeHovered ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={state.isMuted ? 0 : state.volume}
        onChange={handleVolumeChange}
        className="w-24 h-2 bg-gray-600 rounded-full appearance-none cursor-pointer"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
            state.volume * 100
          }%, #4b5563 ${state.volume * 100}%, #4b5563 100%)`,
        }}
      />
    </motion.div>
  </div>
);

const SettingsPanel = ({ playbackRate, handlePlaybackRateChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.2 }}
    className="absolute bottom-full right-0 mb-2 bg-gray-900 p-4 rounded-lg shadow-lg z-10"
  >
    <h3 className="text-lg font-semibold text-white mb-2">Settings</h3>
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-gray-300">Playback Rate:</label>
      <select
        value={playbackRate}
        onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
        className="bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={0.5}>0.5x</option>
        <option value={0.75}>0.75x</option>
        <option value={1}>1x</option>
        <option value={1.25}>1.25x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select>
    </div>
  </motion.div>
);

VideoPlayer.propTypes = {
  initialVideoSrc: PropTypes.string,
};

ControlButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired,
  className: PropTypes.string,
};

VolumeControl.propTypes = {
  state: PropTypes.shape({
    isMuted: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    isVolumeHovered: PropTypes.bool.isRequired,
  }).isRequired,
  toggleMute: PropTypes.func.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
};

SettingsPanel.propTypes = {
  playbackRate: PropTypes.number.isRequired,
  handlePlaybackRateChange: PropTypes.func.isRequired,
};

export default memo(VideoPlayer);
