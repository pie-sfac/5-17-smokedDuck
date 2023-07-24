/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';

import LinkCreateComponent from './LinkCreateComponent';
import LinkViewComponent from './LinkViewComponent';

export default function LinkComponent() {
  const [formData, setFormData] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <div>
      {!formData ? (
        <LinkCreateComponent onSubmit={handleFormSubmit} />
      ) : (
        <LinkViewComponent
          category={formData.category}
          linkUrl={formData.linkUrl}
          linkTitle={formData.title}
          description={formData.description}
        />
      )}
    </div>
  );
}
