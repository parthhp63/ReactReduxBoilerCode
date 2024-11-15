
import React, { useState, useRef, useCallback } from 'react'
import { EditorState, RichUtils, Modifier,convertToRaw} from 'draft-js'

import Editor from '@draft-js-plugins/editor'
import createToolbarPlugin from '@draft-js-plugins/static-toolbar'
import createLinkPlugin from '@draft-js-plugins/anchor'
import createEmojiPlugin from '@draft-js-plugins/emoji'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from '@draft-js-plugins/buttons'
import '@draft-js-plugins/static-toolbar/lib/plugin.css'
import '@draft-js-plugins/emoji/lib/plugin.css'
import '@draft-js-plugins/anchor/lib/plugin.css'

const toolbarPlugin = createToolbarPlugin()
const linkPlugin = createLinkPlugin()
const emojiPlugin = createEmojiPlugin()

const { Toolbar } = toolbarPlugin
const { EmojiSelect } = emojiPlugin

const plugins = [toolbarPlugin, linkPlugin, emojiPlugin]

const customStyleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
}

const colorStyleMap = {
  red: { color: 'rgba(255, 0, 0, 1.0)' },
  orange: { color: 'rgba(255, 127, 0, 1.0)' },
  yellow: { color: 'rgba(180, 180, 0, 1.0)' },
  green: { color: 'rgba(0, 180, 0, 1.0)' },
  blue: { color: 'rgba(0, 0, 255, 1.0)' },
  indigo: { color: 'rgba(75, 0, 130, 1.0)' },
  violet: { color: 'rgba(127, 0, 255, 1.0)' },
}

const bgColorStyleMap = {
  bgRed: { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
  bgOrange: { backgroundColor: 'rgba(255, 127, 0, 0.2)' },
  bgYellow: { backgroundColor: 'rgba(180, 180, 0, 0.2)' },
  bgGreen: { backgroundColor: 'rgba(0, 180, 0, 0.2)' },
  bgBlue: { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
  bgIndigo: { backgroundColor: 'rgba(75, 0, 130, 0.2)' },
  bgViolet: { backgroundColor: 'rgba(127, 0, 255, 0.2)' },
}

const lineHeights = {
  '1': { lineHeight: '1' },
  '1.5': { lineHeight: '1.5' },
  '2': { lineHeight: '2' },
}

export default function RichTextEditor({ setNoteData }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const editor = useRef<Editor>(null)

  const focus = () => {
    if (editor.current) editor.current.focus()
  }

  // const onChange = (newEditorState: EditorState) => {
  //   setEditorState(newEditorState)
  //   // Extract the content in plain text and log it
  //   const contentState = editorState.getCurrentContent();
  //   const rawContentState = convertToRaw(contentState); // raw JSON structure
  //   // console.log(rawContentState,'rawContentState');


  //   const plainText = contentState.getPlainText()
  //   console.log(plainText)

  // }

  // const onChange = (newEditorState) => {
  //   setEditorState(newEditorState);
  
  //   // Extract the content state
  //   const contentState = newEditorState.getCurrentContent();
  
  //   // Convert content state to raw JSON structure
  //   const rawContentState = convertToRaw(contentState);
  //   console.log(rawContentState, 'rawContentState');
  
  //   // Get plain text
  //   const plainText = contentState.getPlainText();
  //   console.log(plainText, 'plainText');
  
  //   // Convert content state to HTML
  //   const htmlContent = stateToHTML(contentState);
  //   console.log(htmlContent, 'htmlContent');
  // };

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  
    const contentState = newEditorState.getCurrentContent();
  
    // Function to extract dynamic inline styles from raw content
    const extractInlineStyles = (contentState) => {
      const styles = {};
      const rawContent = convertToRaw(contentState);
  
      // Traverse blocks and apply any inline styles encountered
      rawContent.blocks.forEach(block => {
        block.inlineStyleRanges.forEach(styleRange => {
          const style = styleRange.style;
  
          // Assume styles are stored as "COLOR_<colorName>" or similar
          if (style.startsWith('COLOR_')) {
            const color = style.split('_')[1].toLowerCase();
            styles[style] = { style: { color: color } };
          }
          // Add more conditions here if you have different style formats
        });
      });
  
      return styles;
    };
  
    // Generate dynamic inline styles based on content
    const dynamicInlineStyles = extractInlineStyles(contentState);
  
    // Options for stateToHTML with dynamically extracted styles
    const options = {
      inlineStyles: dynamicInlineStyles
    };
  

  };

  const getEditorText = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState); // raw JSON structure
    
  };
  // const handleSubmit = async () => {
  //   // const content = editorState.getCurrentContent().getPlainText()
  //   const content = getEditorText();
  //  console.log(content)
  // }

  // const handleClick=()=>{
  //   const contentState = editorState.getCurrentContent();
  //   const rawContentState = convertToRaw(contentState); // raw JSON structure
  //   console.log(rawContentState,'rawContentState');
  //   setData(rawContentState)
  // }

  const handleClick = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    // console.log(rawContentState, 'rawContentState');
    setNoteData(rawContentState);
  };

  const hasMeaningfulContent = () => {
    const contentText = editorState.getCurrentContent().getPlainText('\u0001'); // '\u0001' avoids merging empty lines
    return contentText.trim().length > 0;
  };



  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  const toggleColor = (color: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, color))
  }

  const toggleBgColor = (bgColor: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, bgColor))
  }

  const toggleLineHeight = (lineHeight: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, lineHeight))
  }

  const toggleTextAlign = (textAlign: string) => {
    const selection = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const blockData = contentState.getBlockForKey(selection.getStartKey()).getData()
    const newContentState = Modifier.mergeBlockData(contentState, selection, { textAlign })
    onChange(EditorState.push(editorState, newContentState, 'change-block-data'))
  }

  const addLink = useCallback(() => {
    const selection = editorState.getSelection()
    const link = window.prompt('Enter a URL')
    if (!link) {
      onChange(RichUtils.toggleLink(editorState, selection, null))
      return
    }
    const content = editorState.getCurrentContent()
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link })
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity')
    const entityKey = contentWithEntity.getLastCreatedEntityKey()
    onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
  }, [editorState, onChange])

  return (
    <div className="rich-text-editor">
      <Toolbar>
        {(externalProps) => (
          <div className="toolbar">
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <button onClick={() => toggleInlineStyle('STRIKETHROUGH')}>Strikethrough</button>
            <HeadlineOneButton {...externalProps} />
            <HeadlineTwoButton {...externalProps} />
            <HeadlineThreeButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <button onClick={addLink}>Link</button>
            <div>
              <select onChange={(e) => toggleColor(e.target.value)}>
                <option value="">Text Color</option>
                {Object.keys(colorStyleMap).map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select onChange={(e) => toggleBgColor(e.target.value)}>
                <option value="">Background Color</option>
                {Object.keys(bgColorStyleMap).map((bgColor) => (
                  <option key={bgColor} value={bgColor}>
                    {bgColor.slice(2)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select onChange={(e) => toggleTextAlign(e.target.value)}>
                <option value="">Align</option>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
            <div>
              <select onChange={(e) => toggleLineHeight(e.target.value)}>
                <option value="">Line Height</option>
                {Object.keys(lineHeights).map((height) => (
                  <option key={height} value={height}>
                    {height}
                  </option>
                ))}
              </select>
            </div>
            <EmojiSelect />
          </div>
        )}
      </Toolbar>
      <div className="editor" onClick={() => editor.current.focus()}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          handleKeyCommand={handleKeyCommand}
          ref={editor}
  
          customStyleMap={{ ...customStyleMap, ...colorStyleMap, ...bgColorStyleMap, ...lineHeights }}
        />
      </div>
      <button
        onClick={handleClick}
        disabled={!hasMeaningfulContent()}
        style={{
          backgroundColor: hasMeaningfulContent() ? '#4CAF50' : '#ccc',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: hasMeaningfulContent() ? 'pointer' : 'not-allowed',
          marginTop: '10px'
        }}
      >
        Save
      </button>
      <style jsx>{`
        .rich-text-editor {
          border: 1px solid #ccc;
          padding: 10px;
          font-family: 'Arial', sans-serif;
        }
        .toolbar {
          margin-bottom: 10px;
        }
        .editor {
          min-height: 200px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}