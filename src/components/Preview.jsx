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
    const { data, isPro } = useInvoice();

    const TemplateComponent = templates[data.template] || templates.modern;

    return (
        <div className="preview-container relative" ref={ref}>
            <TemplateComponent data={data} {...props} />

            {/* Watermark for free users */}
            {!isPro && (
                <div
                    className="absolute bottom-4 left-0 right-0 text-center pointer-events-none"
                    style={{ opacity: 0.4 }}
                >
                    <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                        Created with Mstudio Invoice
                    </p>
                </div>
            )}
        </div>
    );
});

export default Preview;
