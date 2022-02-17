import React, { useState } from 'react';
import { AddLightingTalkRequest } from '../../models';
import { lightingTalkStore } from '../../stores';
import './index.scss';

type Props = {
  onSuccess?: () => void;
  onFailed?: () => void;
  onCancel?: () => void;
};

const LightingTalkEditor: React.FC<Props> = (props) => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e: any) => {
    setError('');
    e?.preventDefault();
    const request = {
      topic: topic,
      content: content,
    } as AddLightingTalkRequest;
    lightingTalkStore
      .addLightingTalk(request)
      .then(() => {
        props.onSuccess?.call(this);
      })
      .catch((err) => {
        setError(err);
        props.onFailed?.call(this);
      });
  };

  return (
    <section className="lighting-talk-editor">
      <h2>New Topic</h2>
      {/* {error && <div>{error}</div>} */}
      <form>
        <div>
          <label className="required">Topic</label>
          <input type="text" onInput={(e: any) => setTopic(e.target.value)} maxLength={255} />
        </div>
        <div style={{ marginTop: 12 }}>
          <label className="required">Content</label>
          <textarea rows={10} onInput={(e: any) => setContent(e.target.value)}></textarea>
        </div>
        <div className="lighting-talk-editor__footer">
          <button type="submit" onClick={(e) => onSubmit(e)} disabled={!topic || !content}>
            Submit
          </button>
          <button type="reset" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default LightingTalkEditor;
