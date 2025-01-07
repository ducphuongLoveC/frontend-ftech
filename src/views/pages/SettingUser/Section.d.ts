export interface SectionItem {
    field: string;
    section: string;
}
interface SectionProps {
    data: SectionItem[];
    onChange: (section: SectionItem) => void;
}
declare const Section: React.FC<SectionProps>;
export default Section;
