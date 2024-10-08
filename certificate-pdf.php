<?php 

/*
 * Plugin Name:      Certificate PDF Plugin
* Plugin URI:        https://github.com/shakib6472/
* Description:       certificate-pdf
* Version:           1.0.0
* Requires at least: 5.2
* Requires PHP:      7.2
* Author:            Shakib Shown
* Author URI:        https://github.com/shakib6472/
* License:           GPL v2 or later
* License URI:       https://www.gnu.org/licenses/gpl-2.0.html
* Text Domain:       core-helper
* Domain Path:       /languages
*/
if (!defined('ABSPATH')) {
exit; // Exit if accessed directly.
}

function certificate_pdf_enqueue_scripts()
{
	//css
	wp_enqueue_style('swagbulk-style', plugin_dir_url(__FILE__) . '/style.css');
	//wp_enqueue_script('font-owesome', plugin_dir_url(__
	//js
	wp_enqueue_script('jquery');
	wp_enqueue_script('swagbulk-script', plugin_dir_url(__FILE__) . '/script.js', array('jquery'), '1.0.0', true);
	// wp_enqueue_script('swagbulk-htmlcanvasskb-script',  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js', array('jquery'), '1.0.0', true);
	wp_enqueue_script('swagbulk-epdfkldfhasdsafas-script',  'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js', array('jquery'), '1.0.0', true);

	// Localize the script with new data
	wp_localize_script('swagbulk-script', 'ajax_object', array(
		'ajax_url' => admin_url('admin-ajax.php'),
		'home_url' => home_url(),
		// Add other variables you want to pass to your script here
	));
}

add_action('wp_enqueue_scripts', 'certificate_pdf_enqueue_scripts');