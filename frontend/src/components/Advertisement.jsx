import React from 'react';

class Advertisement extends React.Component {
    render() {
        const adScript = `
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-2915948343491163"
             data-ad-slot="6519208871"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        `;
        return (
            <div dangerouslySetInnerHTML={{ __html: adScript }} />
        );
    }
}

export default Advertisement;