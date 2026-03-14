import { forwardRef } from 'react';
import { useInvoice } from '../InvoiceContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import BoldTemplate from './templates/BoldTemplate';
import StandardTemplate from './templates/StandardTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import SimpleTemplate from './templates/SimpleTemplate';
import TechTemplate from './templates/TechTemplate';

const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimalist: MinimalistTemplate,
    elegant: ElegantTemplate,
    bold: BoldTemplate,
    standard: StandardTemplate,
    corporate: CorporateTemplate,
    creative: CreativeTemplate,
    simple: SimpleTemplate,
    tech: TechTemplate,
};

const Preview = forwardRef((props, ref) => {
    const { data } = useInvoice();

    const TemplateComponent = templates[data.template] || templates.modern;

    return (
        <div className="preview-container" ref={ref}>
            <TemplateComponent data={data} {...props} />
        </div>
    );
});

export default Preview;
