import { Form, Input, Button, Row, message } from 'antd';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import LoadingModal from 'Components/LoadingModal';

import { uploadIPFS } from './ipfs';
import './index.css';

const { TextArea } = Input;

export default function UploadImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState('');
  const [files, setFiles] = useState([]);

  const [form] = Form.useForm();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const onFinish = (values) => {
    if (files.length > 0) {
      uploadIPFS(values, form, files, setFiles, setIsLoading, setLink);
    } else message.warn('Did you forget upload an Image ?');
  };

  return (
    <div className='center create-pt'>
      <div className='my-collection'>
        {isLoading ? <LoadingModal title={'Upload Image'} visible={true} /> : <></>}
        <h2 className='textmode'>Upload NFT images !!!</h2>

        <div>
          <div>
            <h3 className='text-upload-image textmode'>Upload Image</h3>
            <div className='drag-box-search'>
              <div className='drag-box' {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {!!files[0] ? (
                  <img
                    src={files[0].preview}
                    alt='priview'
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <p className='textmode'>{'Drag and Drop your image here'}</p>
                )}
              </div>
            </div>
            <p>{link}</p>
          </div>
          <div className='input-area'>
            <Form onFinish={onFinish} form={form} layout='vertical'>
              <Form.Item
                label='Name'
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Please input name of NFT!',
                  },
                ]}
              >
                <Input
                  className='input-name-nft input-mode-bc'
                  placeholder='Name of Nft'
                  size='large'
                />
              </Form.Item>
              <Form.Item label='Description' name='description'>
                <TextArea
                  className='input-name-nft input-mode-bc'
                  autoSize={{ minRows: 6 }}
                  placeholder='Description'
                />
              </Form.Item>
              <Form.Item>
                <Row justify='end'>
                  <Button type='primary' htmlType='submit' shape='round' size='large'>
                    Create Item
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
