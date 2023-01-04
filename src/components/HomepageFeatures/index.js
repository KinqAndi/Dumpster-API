import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Garbage Collection Utility Package',
    Svg: require('@site/static/img/empty.svg').default,
    description: (
      <>
        Dumpster lets you focus on your code and your memory leaks, it does the chores for you! Go
        ahead and take a look at the <code>API</code>.
      </>
    ),
  },
  
];

function Feature({Svg, title, description}) {
  return (
    <div className={styles.features}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
