interface StorageProps {
    type: 'videos' | 'images';
    onSelectMedia: (mediaUrl: string) => void;
}
declare const Storage: React.FC<StorageProps>;
export default Storage;
