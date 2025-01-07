export interface TabsCustomProps {
    labels: string[] | React.ReactNode[];
    contents: React.ReactNode[];
    onChange: () => void;
}
declare const TabsCustom: React.FC<TabsCustomProps>;
export default TabsCustom;
