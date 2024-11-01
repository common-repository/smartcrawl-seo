import React from 'react';
import { __ } from '@wordpress/i18n';
import SettingsRow from '../../../components/settings-row';
import Toggle from '../../../components/toggle';
import { createInterpolateElement } from '@wordpress/element';
import SelectField from '../../../components/form-fields/select-field';
import Notice from '../../../components/notices/notice';
import { connect } from 'react-redux';

class Settings extends React.Component {
	render() {
		const {
			options,
			schema_allowed: schemaAllowed,
			schema_enabled: schemaEnabled,
			social_allowed: socialAllowed,
			og_enabled: ogEnabled,
			schema_url: schemaUrl,
			brand_opts: brandOpts,
			social_url: socialUrl,
			loading,
			updateOption,
		} = this.props;

		return (
			<>
				<SettingsRow direction="column">
					<p>
						{__(
							'Use the WooCommerce SEO configurations below to add recommended Woo metadata and Product Schema to your WooCommerce site, helping you stand out in search results pages.',
							'smartcrawl-seo'
						)}
					</p>
				</SettingsRow>

				<SettingsRow
					label={__('Improve Woo Schema', 'smartcrawl-seo')}
					description={__(
						"Improve your site's WooCommerce Schema.",
						'smartcrawl-seo'
					)}
				>
					{schemaAllowed && !schemaEnabled && (
						<Notice
							message={createInterpolateElement(
								__(
									'For these settings to be applied, the <a>Schema module</a> must first be enabled.',
									'smartcrawl-seo'
								),
								{
									a: (
										<a
											target="_blank"
											href={schemaUrl}
											rel="noreferrer"
										/>
									),
								}
							)}
						/>
					)}

					<SelectField
						label={__('Brand', 'smartcrawl-seo')}
						description={__(
							'Select the product taxonomy to use as Brand in Schema & OpenGraph markup.',
							'smartcrawl-seo'
						)}
						options={brandOpts}
						selectedValue={options.brand}
						disabled={loading}
						onSelect={(sel) => updateOption('brand', sel)}
					/>

					<SelectField
						label={__('Global Identifier', 'smartcrawl-seo')}
						description={createInterpolateElement(
							__(
								'Global Identifier key to use in the Product Schema. You can add a Global Identifier value for each product in the <strong>Inventory</strong> section of the <strong>Product Metabox</strong>',
								'smartcrawl-seo'
							),
							{
								strong: <strong />,
							}
						)}
						options={{
							'': __('None', 'smartcrawl-seo'),
							gtin8: 'GTIN-8',
							gtin12: 'GTIN-12',
							gtin13: 'GTIN-13',
							gtin14: 'GTIN-14',
							isbn: 'ISBN',
							mpn: 'MPN',
						}}
						selectedValue={options.global_id}
						disabled={loading}
						onSelect={(sel) => updateOption('global_id', sel)}
					/>

					{schemaAllowed && (
						<Toggle
							label={__('Enable Shop Schema', 'smartcrawl-seo')}
							description={__(
								'Add schema data on the shop page.',
								'smartcrawl-seo'
							)}
							disabled={!schemaEnabled || loading}
							checked={options.shop_schema}
							wrapped
							wrapperClass="sui-form-field"
							onChange={(val) => updateOption('shop_schema', val)}
						/>
					)}
				</SettingsRow>

				<SettingsRow
					label={__('Improve Woo Meta', 'smartcrawl-seo')}
					description={__(
						"Improve your site's default WooCommerce Meta.",
						'smartcrawl-seo'
					)}
				>
					{socialAllowed && !ogEnabled && (
						<Notice
							message={createInterpolateElement(
								__(
									'For these settings to be applied, OpenGraph Support must first be <a>enabled</a>.',
									'smartcrawl-seo'
								),
								{
									a: (
										<a
											target="_blank"
											href={socialUrl}
											rel="noreferrer"
										/>
									),
								}
							)}
						/>
					)}

					{socialAllowed && (
						<Toggle
							label={__(
								'Enable Product Open Graph',
								'smartcrawl-seo'
							)}
							description={__(
								'If enabled, WooCommerce product data will be added to Open Graph.',
								'smartcrawl-seo'
							)}
							disabled={!ogEnabled || loading}
							checked={options.enable_og}
							wrapped
							wrapperClass="sui-form-field"
							onChange={(val) => updateOption('enable_og', val)}
						/>
					)}

					<Toggle
						label={__('Remove Generator Tag', 'smartcrawl-seo')}
						description={createInterpolateElement(
							__(
								'If enabled, the WooCommerce generator tag <strong><meta name="generator" content="WooCommerce x.x.x" /></strong> will be removed.',
								'smartcrawl-seo'
							),
							{ strong: <strong /> }
						)}
						checked={options.rm_gen_tag}
						disabled={loading}
						wrapped
						wrapperClass="sui-form-field"
						onChange={(val) => updateOption('rm_gen_tag', val)}
					/>
				</SettingsRow>

				<SettingsRow
					label={__('Restrict Search Engines', 'smartcrawl-seo')}
					description={__(
						'Use these options to restrict Indexing or crawling of specific pages on the site.',
						'smartcrawl-seo'
					)}
				>
					<Toggle
						label={__('Noindex Hidden Products', 'smartcrawl-seo')}
						description={__(
							'Set Product Pages to noindex when WooCommerce Catalog visibility is set to hidden.',
							'smartcrawl-seo'
						)}
						checked={options.noindex_hidden_prod}
						disabled={loading}
						wrapped
						wrapperClass="sui-form-field"
						onChange={(val) =>
							updateOption('noindex_hidden_prod', val)
						}
					/>

					<Toggle
						label={__(
							'Disallow Crawling of Cart, Checkout & My Account Pages',
							'smartcrawl-seo'
						)}
						description={createInterpolateElement(
							__(
								'If enabled, the following will be added to your Robots.txt file:<br/><strong>Disallow: /*add-to-cart=*<br/>Disallow: /cart/<br/>Disallow: /checkout/<br/>Disallow: /my-account/</strong>',
								'smartcrawl-seo'
							),
							{ strong: <strong />, br: <br /> }
						)}
						checked={options.add_robots}
						disabled={loading}
						wrapped
						wrapperClass="sui-form-field"
						onChange={(val) => updateOption('add_robots', val)}
					/>
				</SettingsRow>
			</>
		);
	}
}

const mapStateToProps = (state) => ({ ...state.woocommerce });

const mapDispatchToProps = {
	updateOption: (key, value) => ({
		type: 'UPDATE_OPTION',
		key,
		value,
	}),
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
